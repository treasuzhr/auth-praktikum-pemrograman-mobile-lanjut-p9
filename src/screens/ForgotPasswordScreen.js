import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Terkirim! 💌', 'Email reset password sudah dikirim~');
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  };

  return (
    <LinearGradient colors={['#f9a8d4', '#fb923c', '#fbbf24']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.emoji}>🌞</Text>
        <Text style={styles.title}>Lupa Password?</Text>
        <Text style={styles.subtitle}>Tenang, kita bantu reset</Text>

        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="📧 Masukkan emailmu" value={email}
            onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#aaa" />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleReset}>
            <Text style={styles.btnText}>Kirim Reset Password </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Kembali ke Login </Text>
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
  subtitle: { fontSize: 14, color: '#fff3e0', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  input: { borderWidth: 1.5, borderColor: '#fed7aa', padding: 12, marginBottom: 14, borderRadius: 14, fontSize: 14, color: '#333' },
  btnPrimary: { backgroundColor: '#fb923c', padding: 14, borderRadius: 14, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  link: { color: '#ea580c', textAlign: 'center', fontSize: 13 },
});