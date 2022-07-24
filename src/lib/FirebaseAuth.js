import React,{createContext,useState} from "react";
import { ToastAndroid } from "react-native";
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '359106193753-lu4muanlthpos21nrjtffd2d63rkehkh.apps.googleusercontent.com',
});

export const AuthContext = createContext();

export const FirebaseAuth = ({children}) => {
    const [user, setUser] = useState(null);

    const SigninEmail = (email,password) => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            ToastAndroid.show('User signed in successfully!', ToastAndroid.SHORT);
            console.log('signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              ToastAndroid.show('Wrong password', ToastAndroid.SHORT);
            }
    
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
              ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
            }
    
            console.error(error);
          });
      }
    return (
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                SignupEmail: (email,password) => {
    if (email == '' || password == '') {
      alert('Please fill required fields.');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show('User created successfully!', ToastAndroid.SHORT);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
           SigninEmail(email,password);
           console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  },     SigninAnonymous: () => {
    auth()
      .signInAnonymously()
      .then(() => {
        ToastAndroid.show('User signed in anonymously!', ToastAndroid.SHORT);
        // console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, SigninGoogle : async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
  },
 }}
        
        >
            {children}
        </AuthContext.Provider>

    )
}