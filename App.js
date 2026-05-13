import { useRef } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const { user, loading, logout } = useAuth();
  const idleTimer = useRef(null);
  const IDLE_TIMEOUT = 10 * 1000;

  const resetTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (user) {
      idleTimer.current = setTimeout(() => {
        logout();
        alert('Sesi berakhir karena tidak aktif selama 5 menit.');
      }, IDLE_TIMEOUT);
    }
  };

  // pantau AppState (foreground/background)
  useRef(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        resetTimer();
      } else {
        if (idleTimer.current) clearTimeout(idleTimer.current);
      }
    });
    return () => sub.remove();
  });

  if (loading) return null;

  return (
    <NavigationContainer onStateChange={resetTimer}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}