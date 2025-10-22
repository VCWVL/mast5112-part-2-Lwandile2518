import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface WelcomeScreenProps {
  setCurrentScreen: (screen: string) => void;
}

export default function WelcomeScreen({ setCurrentScreen }: WelcomeScreenProps) {
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🍔</Text>
        </View>
        <Text style={styles.welcomeTitle}>FoodieChef</Text>
        <Text style={styles.welcomeSubtitle}>Craft Your Perfect Menu</Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => setCurrentScreen('login')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcomeContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 100,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  getStartedButton: {
    marginTop: 30,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
});
