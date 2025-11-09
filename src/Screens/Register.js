import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemedText from '../components/ThemedText';
import { Colors, Spacing, FontWeights } from '../theme/Theme';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleRegister = () => {
    // Add registration logic here
    navigation.replace('MainTabs');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
              </TouchableOpacity>
              
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <ThemedText variant="title" color={Colors.primary}>🌿</ThemedText>
                </View>
                <ThemedText variant="subtitle" color={Colors.primary} style={styles.appName}>
                   PlantIQ
                </ThemedText>
                <ThemedText variant="body" color={Colors.darkGray} style={styles.tagline}>
                  Start your plant journey today!
                </ThemedText>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper, 
                  focusedField === 'name' && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="person-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={Colors.darkGray}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper, 
                  focusedField === 'email' && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="mail-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.darkGray}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper, 
                  focusedField === 'password' && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={Colors.darkGray}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
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

              <View style={styles.inputContainer}>
                <View style={[
                  styles.inputWrapper, 
                  focusedField === 'confirmPassword' && styles.inputWrapperFocused
                ]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.darkGray}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={Colors.darkGray} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <ThemedText variant="heading" color={Colors.white} style={styles.registerButtonText}>
                  Create Account
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
                  Sign up with Google
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <ThemedText variant="body" color={Colors.darkGray}>
                  Already have an account?{' '}
                </ThemedText>
                <TouchableOpacity onPress={handleLogin}>
                  <ThemedText variant="body" color={Colors.primary} style={styles.loginText}>
                    Sign In
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
    opacity: 0.3,
  },
  scrollContent: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    padding: Spacing.sm,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(31, 78, 32, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  tagline: {
    opacity: 0.8,
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  inputContainer: {
    marginBottom: Spacing.md,
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
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  registerButtonText: {
    fontWeight: FontWeights.semibold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
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
    marginBottom: Spacing.lg,
  },
  googleButtonText: {
    marginLeft: Spacing.sm,
    fontWeight: FontWeights.medium,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  loginText: {
    fontWeight: FontWeights.semibold,
  },
});

export default Register;