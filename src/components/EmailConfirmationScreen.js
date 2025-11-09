import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemedText from './ThemedText';
import { Colors, Spacing, FontWeights } from '../theme/Theme';
import { supabase } from '../../supabase';

const EmailConfirmationScreen = ({ navigation, route }) => {
  const { email } = route.params || {};

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) throw error;
      
      Alert.alert(
        'Email Sent',
        'We\'ve sent a new confirmation email to your inbox.'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to resend email. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/image/loginbackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={80} color={Colors.primary} />
          </View>
          
          <ThemedText variant="title" color={Colors.primary} style={styles.title}>
            Check Your Email
          </ThemedText>
          
          <ThemedText variant="body" color={Colors.darkGray} style={styles.message}>
            We've sent a confirmation email to:
          </ThemedText>
          
          <ThemedText variant="heading" color={Colors.primary} style={styles.email}>
            {email}
          </ThemedText>
          
          <ThemedText variant="body" color={Colors.darkGray} style={styles.instructions}>
            Please click the confirmation link in your email to activate your account, then return here to sign in.
          </ThemedText>
          
          <TouchableOpacity style={styles.resendButton} onPress={handleResendEmail}>
            <ThemedText variant="body" color={Colors.primary} style={styles.resendText}>
              Didn't receive the email? Resend
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
            <ThemedText variant="heading" color={Colors.white} style={styles.loginButtonText}>
              Back to Sign In
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  message: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  email: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  instructions: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  resendButton: {
    marginBottom: Spacing.xxl,
  },
  resendText: {
    fontWeight: FontWeights.medium,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontWeight: FontWeights.semibold,
  },
});

export default EmailConfirmationScreen;
