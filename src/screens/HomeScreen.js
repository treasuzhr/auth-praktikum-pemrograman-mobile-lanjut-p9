import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.appName}>WinChat 🏆</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.welcome}>Selamat Datang!</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Status Email</Text>
          <Text style={styles.verified}>
            {user?.emailVerified ? '✅ Sudah terverifikasi' : '❌ Belum terverifikasi'}
          </Text>
        </View>

        <TouchableOpacity style={styles.btnLogout} onPress={logout}>
          <Text style={styles.btnText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, bord