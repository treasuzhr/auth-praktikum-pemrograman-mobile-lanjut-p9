import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      Alert.alert('Yeay! 🎉', 'Akun dibuat! Cek email untuk verifikasi ya~');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <LinearGradient colors={['#818cf8', '#c084fc', '#f9a8d4']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.emoji}>🧸</Text>
        <Text style={styles.title}>Buat Akun Baru</Text>
        <Text style={styles.subtitle}>Ayo daftar dulu~</Text>

        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="📧 Email" value={email}
            onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#aaa" />
          <TextInput style={styles.input} placeholder="🔒 Password (min. 6 karakter)" value={password}
            onChangeText={setPassword} secureTextEntry placeholderTextColor="#aaa" />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
            <Text style={styles.btnText}>Daftar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sudah punya akun? Login di sini</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#ffe4f3', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  input: { borderWidth: 1.5, borderColor: '#e9d5ff', padding: 12, marginBottom: 14, borderRadius: 14, fontSize: 14, color: '#333' },
  btnPrimary: { backgroundColor: '#818cf8', padding: 14, borderRadius: 14, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  link: { color: '#6366f1', textAlign: 'center', fontSize: 13 },
});