import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Add from './Add';
import Show from './Show';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },}}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'journal' }}/>
      <Stack.Screen name="Add" component={Add} options={{ title: 'New Day',
       }} />
      <Stack.Screen name="Show" component={Show} options={{ title: 'data',
       }} />
    </Stack.Navigator>
  )
}

export default AppStack