import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Alert, Text,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      Alert.alert('Berhasil!', 'Akun dibuat. Cek email untuk verifikasi.');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <Text style={styles.logo}>✨</Text>
        <Text style={styles.title}>Buat Akun</Text>
        <Text style={styles.subtitle}>Bergabung dengan WinChat</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="email@example.com"
            value={email} onChangeText={setEmail} autoCapitalize="none"
            placeholderTextColor="#bbb" keyboardType="email-address" />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Min. 6 karakter"
            value={password} onChangeText={setPassword} secureTextEntry
            placeholderTextColor="#bbb" />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
            <Text style={styles.btnPrimaryText}>Daftar</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sudah punya akun? <Text style={styles.linkBold}>Masuk</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  logo: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#111', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#999', textAlign: 'center', marginBottom: 40 },
  form: {},
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    color: '#111', marginBottom: 16,
  },
  btnPrimary: {
    backgroundColor: '#111', borderRadius: 10,
    paddingVertical: 14, alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  link: { color: '#999', textAlign: 'center', fontSize: 13 },
  linkBold: { color: '#111', fontWeight: '700' },
});