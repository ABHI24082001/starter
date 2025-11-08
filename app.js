// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { signIn, signUp, getUser, signOut } from './authService';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      const { user } = await signUp(email, password);
      if (user) {
        Alert.alert(
          'Success',
          'Signup successful! Check your email to confirm.',
        );
        const currentUser = await getUser();
        setUser(currentUser);
      } else {
        Alert.alert('Info', 'Signup email sent. Please verify before login.');
      }
    } catch (e) {
      console.log('Signup error:', e);
      Alert.alert('Signup Failed', e.message);
    }
  };

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      const { user } = await signIn(email, password);
      if (user) {
        Alert.alert('Welcome', `Hello ${user.email}`);
        setUser(user);
      }
    } catch (e) {
      console.log('Signin error:', e);
      Alert.alert('Signin Failed', e.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    Alert.alert('Signed Out', 'You have been logged out successfully.');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.appTitle}>🚀 Supabase Auth</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome 👋</Text>
          <Text style={styles.subtitle}>Sign up or sign in to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <View style={{ marginBottom: 10 }}>
              <Button title="Sign Up" color="#2563eb" onPress={handleSignUp} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Button title="Sign In" color="#059669" onPress={handleSignIn} />
            </View>
            <Button title="Sign Out" color="#dc2626" onPress={handleSignOut} />
          </View>

          {user && (
            <View style={styles.userContainer}>
              <Text style={styles.userText}>✅ Logged in as:</Text>
              <Text style={styles.userText}>{user.email}</Text>
              <Text
                style={[styles.userText, { fontSize: 12, color: '#475569' }]}
              >
                ID: {user.id}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', // soft gradient-like background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
  userContainer: {
    marginTop: 25,
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
  },
  userText: {
    fontSize: 14,
    color: '#1e293b',
    textAlign: 'center',
  },
});
