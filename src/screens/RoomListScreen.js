import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
  StyleSheet, SafeAreaView, StatusBar
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const ROOMS = [
  { id: 'general', name: 'General', emoji: '💬', desc: 'Obrolan bebas & diskusi umum' },
  { id: 'gemastik', name: 'Gemastik', emoji: '🏆', desc: 'Info & diskusi seputar Gemastik' },
  { id: 'icpc', name: 'ICPC & Programming', emoji: '💻', desc: 'Competitive programming & ICPC' },
  { id: 'desain', name: 'Desain & Kreatif', emoji: '🎨', desc: 'Lomba desain, UI/UX, fotografi' },
  { id: 'startup', name: 'Startup & Bisnis', emoji: '🚀', desc: 'Kompetisi startup & business plan' },
  { id: 'mobile', name: 'Mobile & Web Dev', emoji: '📱', desc: 'Hackathon, web & mobile dev' },
  { id: 'umum', name: 'Lomba Umum', emoji: '📢', desc: 'Info lomba lainnya' },
];

export default function RoomListScreen({ navigation }) {
  const { user, logout } = useAuth();

  const renderRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => navigation.navigate('Chat', { roomId: item.id, roomName: item.name, roomEmoji: item.emoji })}
    >
      <Text style={styles.roomEmoji}>{item.emoji}</Text>
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDesc}>{item.desc}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>WinChat 🏆</Text>
          <Text style={styles.headerSub}>Halo, {user?.email?.split('@')[0]}!</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pilih Room</Text>
        <Text style={styles.sectionSub}>{ROOMS.length} room tersedia</Text>
      </View>

      <FlatList
        data={ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appName: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSub: { fontSize: 12, color: '#999', marginTop: 2 },
  logoutBtn: {
    borderWidth: 1, borderColor: '#e0e0e0',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
  },
  logoutText: { fontSize: 13, color: '#555' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  sectionSub: { fontSize: 12, color: '#999' },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  roomCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#f0f0f0',
    borderRadius: 12, marginBottom: 10, backgroundColor: '#fafafa',
  },
  roomEmoji: { fontSize: 28, marginRight: 14 },
  roomInfo: { flex: 1 },
  roomName: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 2 },
  roomDesc: { fontSize: 12, color: '#999' },
  arrow: { fontSize: 22, color: '#ccc', marginLeft: 8 },
});