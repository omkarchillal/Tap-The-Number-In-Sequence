import { getAuth, GoogleAuthProvider, signInWithCredential, signOut as firebaseSignOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';


export const configureGoogleSignIn = () => {
  const webClientId = '530611835630-j0iic2qpfg55hlef3l6jsvnnrvec6408.apps.googleusercontent.com';
  console.log('Configuring Google Sign-In with Hardcoded ID:', webClientId);
  GoogleSignin.configure({
    webClientId: webClientId,
  });
};

export const onGoogleButtonPress = async () => {
  try {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    try {
      await GoogleSignin.signOut();
    } catch (error) {
      // Ignore if not signed in
    }


    const signInResult = await GoogleSignin.signIn();


    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token found');
    }


    const googleCredential = GoogleAuthProvider.credential(idToken);


    const auth = getAuth();
    return signInWithCredential(auth, googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    const auth = getAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign Out Error:', error);
  }
}
