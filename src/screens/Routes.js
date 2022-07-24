import {View, Text, ActivityIndicator} from 'react-native';
import React, {useContext,useState,useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import Login from './Login';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../lib/FirebaseAuth';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(AuthContext);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // unsubscribe on unmount
    console.log('useEffect');
  }, []);

  if (initializing)
    return (
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <Login />}
    </NavigationContainer>
  );
};

export default Routes;
