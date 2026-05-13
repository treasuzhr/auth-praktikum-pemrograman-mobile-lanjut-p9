# 🔐 Auth Praktikum — Pertemuan 9

Aplikasi mobile authentication & authorization menggunakan React Native (Expo) + Firebase Auth.

## 👤 Identitas
- **Nama:** Ukhti Zahra Isyana
- **NIM:** 2410501130
- **Kelas:** A

## 📱 Fitur Praktikum
- ✅ Register dengan Email & Password
- ✅ Email Verification
- ✅ Login dengan Email & Password
- ✅ Protected Routes (Auth Stack & App Stack)
- ✅ Logout
- ✅ Forgot Password / Reset Password
- ✅ Biometric Login (Fingerprint / Face ID)

## ⭐ Tugas Mandiri — Auto-logout Idle
Fitur auto-logout otomatis mengeluarkan pengguna jika tidak ada aktivitas selama **5 menit**. 
Implementasi menggunakan `AppState` dan `setTimeout` di React Native.

### Cara Kerja:
1. Setiap kali pengguna berpindah screen, timer di-reset
2. Jika tidak ada aktivitas selama 5 menit, fungsi `logout` dipanggil otomatis
3. Muncul notifikasi "Sesi berakhir karena tidak aktif selama 5 menit"
4. Pengguna diarahkan kembali ke halaman Login

## 🛠️ Teknologi yang Digunakan
- React Native (Expo blank template)
- Firebase Authentication
- expo-secure-store
- expo-local-authentication
- AsyncStorage
- React Navigation

## 🚀 Cara Menjalankan
```bash
# Clone repository
git clone [https://github.com/treasuzhr/auth-praktikum-pemrograman-mobile-lanjut-p9]
cd auth-praktikum

# Install dependencies
npm install
npx expo install firebase expo-secure-store expo-local-authentication @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context expo-linear-gradient

# Jalankan
npx expo start
```

## 🎥 Video Demo
[https://youtu.be/nLBgAeFhCYQ?si=QTRTs8nqZJZPYoPt]