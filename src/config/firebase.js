import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6OvPrLRxQBu1eFHhLO0HF-QC0Yq_lC9g",
  authDomain: "auth-praktikum-3f641.firebaseapp.com",
  projectId: "auth-praktikum-3f641",
  storageBucket: "auth-praktikum-3f641.firebasestorage.app",
  messagingSenderId: "354600349534",
  appId: "1:354600349534:web:b50aba68d8e952e86be9cf"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);