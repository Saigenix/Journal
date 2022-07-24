import { View, Text,StyleSheet,TouchableOpacity,ToastAndroid,ActivityIndicator,
ScrollView,Modal,Image


} from 'react-native'
import React,{useEffect,useState,useContext,useLayoutEffect} from 'react'
import auth from '@react-native-firebase/auth';
import Colors from '../../assests/Colours'
import QuoteCard from '../components/QuoteCard'
import {AuthContext} from '../lib/FirebaseAuth'
import Firestore from '../lib/Firestore';


const Home = ({navigation}) => {
    
  
    const newAdd = () => {
        // alert('New Day Added')
       
        navigation.navigate('Add')
    }
    const SignOut = () => {
      auth()
        .signOut()
        .then(() => {ToastAndroid.show('Signed Out', ToastAndroid.SHORT);})
        .catch(error => console.error(error));
      
    };
    useLayoutEffect(() => {
      // console.log("working")
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
          onPress={SignOut}
          >
          <Image
          source={require('../../assests/off.png')}
          style={{
            width: 35,
            height: 35,
          }}
        />
        </TouchableOpacity>
        ),
      });
    }, [navigation]);
  return (
    <View style={styles.view}>
      <QuoteCard/>
      <View style={styles.button}>
      <TouchableOpacity
      onPress={newAdd}>
        <Image style={styles.img}source={require('../../assests/plus.png')}/>
      </TouchableOpacity>
      </View>
      <Firestore navigation={navigation}/>
    </View>
  )}

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor: 'black',
        color: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
    
    },
    button:{
        position: 'absolute',
        
        top: '85%',
        left: '70%',
        zIndex: 1,
    },
    txt:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    btn:{
        backgroundColor: 'black',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',


    },
    viewload:{
      flex:1,
      backgroundColor: Colors.back,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
  
  },
  img:{
    width: 80,
    height: 80,
  }
})
export default Home