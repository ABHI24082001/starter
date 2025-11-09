import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemedText from '../components/ThemedText';
import { Colors, Spacing, FontWeights } from '../theme/Theme';

// Default login credentials
const DEFAULT_EMAIL = 'sonukr3@gmail.com';
const DEFAULT_PASSWORD = '12345';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = () => {
    // Validate email and password
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Check against default credentials
    if (email.trim().toLowerCase() === DEFAULT_EMAIL.toLowerCase() && password === DEFAULT_PASSWORD) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../assets/image/loginbackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.overlay}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <ThemedText variant="title" color={Colors.primary}>🌱</ThemedText>
                </View>
                <ThemedText variant="subtitle" color={Colors.primary} style={styles.appName}>
                  PlantIQ
                </ThemedText>
                <ThemedText variant="body" color={Colors.darkGray} style={styles.tagline}>
                  Welcome back, plant parent!
                </ThemedText>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  isEmailFocused && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="mail-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.darkGray}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper,
                  isPasswordFocused && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={Colors.darkGray}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={Colors.darkGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <ThemedText variant="body" color={Colors.primary} style={styles.forgotText}>
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <ThemedText variant="heading" color={Colors.white} style={styles.loginButtonText}>
                  Sign In
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText variant="body" color={Colors.darkGray} style={styles.dividerText}>
                  or
                </ThemedText>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={20} color={Colors.primary} />
                <ThemedText variant="body" color={Colors.primary} style={styles.googleButtonText}>
                  Continue with Google
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <ThemedText variant="body" color={Colors.darkGray}>
                  Don't have an account?{' '}
                </ThemedText>
                <TouchableOpacity onPress={handleRegister}>
                  <ThemedText variant="body" color={Colors.primary} style={styles.registerText}>
                    Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: Spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(12, 138, 14, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontWeight: FontWeights.bold,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  tagline: {
    opacity: 0.8,
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.black,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xxl,
  },
  forgotText: {
    fontWeight: FontWeights.medium,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: Spacing.lg,
  },
  loginButtonText: {
    fontWeight: FontWeights.semibold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: Spacing.md,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: Spacing.xxl,
  },
  googleButtonText: {
    marginLeft: Spacing.sm,
    fontWeight: FontWeights.medium,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  registerText: {
    fontWeight: FontWeights.semibold,
  },
});

export default Login;