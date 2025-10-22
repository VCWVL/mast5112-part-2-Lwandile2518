import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

interface LoginScreenProps {
  setUsername: (username: string) => void;
  setCurrentScreen: (screen: string) => void;
}

export default function LoginScreen({ setUsername, setCurrentScreen }: LoginScreenProps) {
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    if (inputValue.trim()) {
      setUsername(inputValue);
      setCurrentScreen('home');
    } else {
      Alert.alert('Please enter a username');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Welcome Back!</Text>
        <Text style={styles.loginSubtitle}>Enter your username to continue</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter username"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleContinue}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleContinue}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContent: {
    width: '100%',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  continueButton: {
    width: '100%',
    padding: 15,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
