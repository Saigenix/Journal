import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect,useContext} from 'react';
import Colors from '../../assests/Colours';
import { AuthContext } from '../lib/FirebaseAuth';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { SignupEmail,SigninAnonymous,SigninGoogle } = useContext(AuthContext);
  
  const onpress = () => {
    // alert('Login Successful')
    ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.view}>
    <Text style={styles.title}>Daily Journal</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={email}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={password}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>SignupEmail(email,password)}>
        <Text style={styles.txt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>SignupEmail(email,password)}>
        <Text style={styles.txt}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          SigninGoogle()
            .then(() => {
              ToastAndroid.show(
                'User signed in with Google!',
                ToastAndroid.SHORT,
              );
              console.log('User signed in with Google!');
            })
            .catch(error => {
              console.error(error);
            })
        }>
        <Text style={styles.txt}>Login with google</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.btn} onPress={()=>SigninAnonymous(email,password)}>
        <Text style={styles.txt}>Login Anonymously</Text>
      </TouchableOpacity> */}
      
      <Text style={styles.saigenix}>Made By Saigenix</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'white',
  },
  btn: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'white',
  },
  inputView: {
    backgroundColor: 'black',
    width: '70%',
    height: 45,
    marginBottom: 20,
     alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth:2,
  },

  TextInput: {
    color: 'white',
    fontSize: 20,
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 10,
    color: 'white',
  },
  saigenix: {
    color: 'white',
    opacity: 0.5,
    fontSize: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    top: -50,
    transform: [{ rotate: '-10deg' }],
   // textShadowColor: 'white',
  textShadowOffset: {width: -3, height: 3},
  textShadowRadius: 15

  }
});

export default Login;
