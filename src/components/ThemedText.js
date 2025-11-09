import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights } from '../theme/Theme';

const ThemedText = ({ 
  children, 
  variant = 'body', 
  color = Colors.black, 
  style, 
  ...props 
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'heading':
        return styles.heading;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return (
    <Text 
      style={[getTextStyle(), { color }, style]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxxlarge,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.semibold,
  },
  heading: {
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.medium,
  },
  body: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.regular,
  },
  caption: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.light,
  },
});

export default ThemedText;
