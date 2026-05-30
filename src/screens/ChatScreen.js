import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar
} from 'react-native';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function ChatScreen({ route, navigation }) {
  const { roomId, roomName, roomEmoji } = route.params;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return unsub;
  }, [roomId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        text: text.trim(),
        senderId: user.uid,
        senderEmail: user.email,
        timestamp: serverTimestamp(),
      });
      setText('');
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.senderId === user.uid;
    return (
      <View style={[styles.bubbleWrapper, isMe ? styles.myWrapper : styles.theirWrapper]}>
        {!isMe && (
          <Text style={styles.senderName}>{item.senderEmail?.split('@')[0]}</Text>
        )}
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.bubbleText, isMe ? styles.myText : styles.theirText]}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {item.timestamp?.toDate().toLocaleTimeString('id-ID', {
            hour: '2-digit', minute: '2-digit'
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.roomTitle}>{roomEmoji} {roomName}</Text>
          <Text style={styles.roomSub}>WinChat</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>{roomEmoji}</Text>
              <Text style={styles.emptyText}>Belum ada pesan.</Text>
              <Text style={styles.emptySubText}>Jadilah yang pertama kirim pesan!</Text>
            </View>
          }
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tulis pesan..."
            value={text}
            onChangeText={setText}
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!text.trim()}
          >
            <Text style={styles.sendText}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backText: { fontSize: 28, color: '#111', lineHeight: 32 },
  headerCenter: { flex: 1, alignItems: 'center' },
  roomTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  roomSub: { fontSize: 11, color: '#999', marginTop: 1 },
  messageList: { padding: 16, paddingBottom: 8, flexGrow: 1 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 4 },
  emptySubText: { fontSize: 13, color: '#999' },
  bubbleWrapper: { marginBottom: 14, maxWidth: '75%' },
  myWrapper: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  theirWrapper: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  senderName: { fontSize: 11, color: '#888', marginBottom: 3, fontWeight: '600' },
  bubble: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9 },
  myBubble: { backgroundColor: '#111' },
  theirBubble: { backgroundColor: '#f2f2f2' },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  myText: { color: '#fff' },
  theirText: { color: '#111' },
  timestamp: { fontSize: 10, color: '#bbb', marginTop: 3 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end',
    padding: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#e0e0e0',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 14, maxHeight: 100, marginRight: 8, color: '#111',
  },
  sendBtn: {
    backgroundColor: '#111', paddingHorizontal: 16,
    paddingVertical: 10, borderRadius: 10, justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#ccc' },
  sendText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});