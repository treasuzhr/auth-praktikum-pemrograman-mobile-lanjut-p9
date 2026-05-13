import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('saved_email', email);
      await AsyncStorage.setItem('saved_password', password);
    } catch (e) {
      Alert.alert('Login gagal', e.message);
    }
  };

  const handleBiometric = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        Alert.alert('Belum ada session', 'Silakan login dulu dengan password.');
        return;
      }
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) { Alert.alert('Info', 'Device tidak punya sensor biometric.'); return; }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) { Alert.alert('Info', 'Belum ada biometric yang terdaftar.'); return; }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login dengan biometric',
        fallbackLabel: 'Gunakan password',
      });
      if (result.success) {
        const savedEmail = await AsyncStorage.getItem('saved_email');
        const savedPassword = await AsyncStorage.getItem('saved_password');
        if (savedEmail && savedPassword) {
          await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
        } else {
          Alert.alert('Gagal', 'Login dengan password dulu ya~');
        }
      } else {
        Alert.alert('Gagal', 'Biometric tidak cocok.');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <LinearGradient colors={['#f9a8d4', '#c084fc', '#818cf8']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Text style={styles.emoji}>🌸</Text>
        <Text style={styles.title}>Halo, Selamat Datang!</Text>
        <Text style={styles.subtitle}>Masuk ke akunmu</Text>

        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="📧 Email" value={email}
            onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#aaa" />
          <TextInput style={styles.input} placeholder="🔒 Password" value={password}
            onChangeText={setPassword} secureTextEntry placeholderTextColor="#aaa" />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} onPress={handleBiometric}>
            <Text style={styles.btnTextSecondary}>Login dengan Biometric</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Belum punya akun? Daftar di sini</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Lupa password?</Text>
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
  btnPrimary: { backgroundColor: '#c084fc', padding: 14, borderRadius: 14, alignItems: 'center', marginBottom: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  btnSecondary: { backgroundColor: '#f3e8ff', padding: 14, borderRadius: 14, alignItems: 'center', marginBottom: 16 },
  btnTextSecondary: { color: '#9333ea', fontWeight: 'bold', fontSize: 15 },
  link: { color: '#a855f7', textAlign: 'center', marginTop: 6, fontSize: 13 },
});