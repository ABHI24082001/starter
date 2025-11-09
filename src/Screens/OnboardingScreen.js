import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import ThemedText from '../components/ThemedText';
import { Colors, Spacing, FontSizes, FontWeights } from '../theme/Theme';

const OnboardingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.plantIcon}>
            <ThemedText variant="title" color={Colors.white}>🌱</ThemedText>
          </View>
        </View>
        
        <ThemedText variant="title" color={Colors.white} style={styles.title}>
          ROOTS
        </ThemedText>
        
        <ThemedText variant="body" color={Colors.white} style={styles.subtitle}>
          Nurturing Growth
        </ThemedText>
        
        <ThemedText variant="body" color={Colors.white} style={styles.description}>
          Welcome to your personal plant care companion. 
          Track, nurture, and watch your green friends thrive.
        </ThemedText>
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <ThemedText variant="heading" color={Colors.primary} style={styles.buttonText}>
            Get Started
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  plantIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
    letterSpacing: 2,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    opacity: 0.9,
  },
  description: {
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 24,
    opacity: 0.9,
  },
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: 30,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: Colors.black,
  },
  buttonText: {
    fontWeight: FontWeights.semibold,
  },
});

export default OnboardingScreen;
