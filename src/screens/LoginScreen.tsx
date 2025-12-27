import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { onGoogleButtonPress } from '../services/auth';
import ErrorModal from '../components/ErrorModal';
import BounceButton from '../components/BounceButton';
import { CLOUDINARY_URLS } from '../config/cloudinary';

import { styles } from './styles/LoginScreenStyles';

const LoginScreen = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log('Attempting Google Sign-In...');
    try {
      await onGoogleButtonPress();
      console.log('Signed in with Google! Verifying user...');
    } catch (error: any) {
      console.error('Login Failed Detailed Error:', error);
      console.log('Error Code:', error.code);

      let msg = error.message || 'An unknown error occurred';

      // Handle "Sign-in in progress" and other common errors
      if (msg.includes('Sign-in in progress') || msg.includes('previous promise did not settle')) {
        msg = 'Sign-in is already in progress. Please wait a moment.';
      } else if (msg.includes('DEVELOPER_ERROR')) {
        msg = 'Configuration Error: SHA-1 mismatch. Please check Firebase Console.';
      } else if (msg.includes('No ID token found')) {
        msg = 'Login Verification Failed: No ID Token received from Google.';
      } else if (msg.includes('Canceled') || msg.includes('cancelled')) {
        msg = 'Sign-in cancelled';
      } else if (error.code === '7') { // NETWORK_ERROR often comes as code 7
        msg = 'Network Error: Please check your internet connection.';
      } else if (error.code === '10') { // DEVELOPER_ERROR
        msg = 'Developer Error: Check SHA-1/Package Name in Firebase.';
      }

      setErrorMessage(msg);
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: CLOUDINARY_URLS.text }}
          style={styles.labelImage}
          resizeMode="stretch"
        />

        <BounceButton onPress={handleSignIn} disabled={isLoading}>
          <Image
            source={{ uri: CLOUDINARY_URLS.continueWithGoogle }}
            style={styles.googleButtonImage}
            resizeMode="contain"
          />
        </BounceButton>
      </View>

      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;
