import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <LinearGradient colors={['#c084fc', '#818cf8', '#38bdf8']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🫧</Text>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Selamat Datang</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email kamu:</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <Text style={styles.label}>Status verifikasi:</Text>
          <Text style={styles.verified}>
            {user?.emailVerified ? '✅ Email sudah terverifikasi' : '❌ Email belum terverifikasi'}
          </Text>
        </View>

        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#e0f2fe', marginBottom: 32 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '100%', marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  label: { fontSize: 12, color: '#aaa', marginBottom: 4, marginTop: 8 },
  email: { fontSize: 16, fontWeight: 'bold', color: '#7c3aed' },
  verified: { fontSize: 14, color: '#333', marginTop: 4 },
  btnLogout: { backgroundColor: '#f43f5e', padding: 14, borderRadius: 14, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});