import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Alert, Text,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          Alert.alert('Gagal', 'Login dengan password dulu ya.');
        }
      } else {
        Alert.alert('Gagal', 'Biometric tidak cocok.');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <Text style={styles.logo}>🏆</Text>
        <Text style={styles.title}>WinChat</Text>
        <Text style={styles.subtitle}>Info lomba & kompetisi</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="email@example.com"
            value={email} onChangeText={setEmail} autoCapitalize="none"
            placeholderTextColor="#bbb" keyboardType="email-address" />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••"
            value={password} onChangeText={setPassword} secureTextEntry
            placeholderTextColor="#bbb" />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnPrimaryText}>Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} onPress={handleBiometric}>
            <Text style={styles.btnSecondaryText}>🔑  Login dengan Biometric</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Belum punya akun? <Text style={styles.linkBold}>Daftar</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Lupa password?</Text>
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
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnSecondary: {
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10,
    paddingVertical: 14, alignItems: 'center',
  },
  btnSecondaryText: { color: '#111', fontWeight: '600', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  link: { color: '#999', textAlign: 'center', fontSize: 13, marginBottom: 10 },
  linkBold: { color: '#111', fontWeight: '700' },
});