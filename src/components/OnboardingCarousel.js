import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemedText from './ThemedText';
import { Colors, Spacing, FontWeights } from '../theme/Theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Discover Plants',
    subtitle: 'Trending Now',
    description: 'Explore the latest trending plants and find your perfect green companion. From succulents to tropical beauties.',
    lottieSource: require('../assets/lotti view/Growing Plant.json'),
    trend: '🔥 Snake Plants - Most Popular'
  },
  {
    id: 2,
    title: 'Smart Care',
    subtitle: 'AI-Powered',
    description: 'Get personalized care reminders and expert tips powered by AI. Never forget to water your plants again.',
    lottieSource: require('../assets/lotti view/plant.json'),
    trend: '💧 Smart Watering - New Feature'
  },
  {
    id: 3,
    title: 'Grow Together',
    subtitle: 'Community',
    description: 'Join a thriving community of plant lovers. Share your growth journey and learn from others.',
    lottieSource: require('../assets/lotti view/Plant growing animation.json'),
    trend: '🌟 Plant Challenges - Join Now'
  }
];

const OnboardingCarousel = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderOnboardingItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.animationContainer}>
        <LottieView
          source={item.lottieSource}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      
      <View style={styles.trendingBadge}>
        <ThemedText variant="caption" color={Colors.primary} style={styles.trendingText}>
          {item.trend}
        </ThemedText>
      </View>

      <ThemedText variant="title" color={Colors.white} style={styles.title}>
        {item.title}
      </ThemedText>
      
      <ThemedText variant="heading" color={Colors.white} style={styles.subtitle}>
        {item.subtitle}
      </ThemedText>
      
      <ThemedText variant="body" color={Colors.white} style={styles.description}>
        {item.description}
      </ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <ThemedText variant="body" color={Colors.white} style={styles.skipText}>
            Skip
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderOnboardingItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
          {currentIndex === onboardingData.length - 1 ? (
            <Ionicons name="checkmark" size={24} color={Colors.primary} />
          ) : (
            <Ionicons name="arrow-forward" size={24} color={Colors.primary} />
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 50,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    opacity: 0.8,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  animationContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  trendingBadge: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    marginBottom: Spacing.lg,
  },
  trendingText: {
    fontWeight: FontWeights.semibold,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
    opacity: 0.9,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 50,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: Spacing.xxl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.white,
    width: 24,
  },
  arrowButton: {
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    position: 'absolute',
    right: Spacing.xl,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: Colors.black,
  },
});

export default OnboardingCarousel;
