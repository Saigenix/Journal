import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Colors from '../../assests/Colours';
  
  const QuoteCard = () => {
    const [qoute, setqoute] = useState('Stay Hungry, stay Foolish');
    const [loding, setloding] = useState(true);
    const qouteurl = 'https://api.quotable.io/random?maxLength=120';
    const getqoute = async () => {
      try {
        const respornce = await fetch(qouteurl);
        const qoute = await respornce.json();
        setqoute(qoute.content);
        setloding(false);
        console.log(qoute.content);
      } catch (error) {
        console.log(error);
        setloding(true);
      }
    };
  
    useEffect(() => {
      getqoute();
    }, []);
  
    return (
      <View style={Styles.view}>
        <View style={Styles.card}>
          {loding ? (
            <View>
              <Text style={Styles.txt}>Stay Hungry, Stay Foolish</Text>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : (
            <Text style={Styles.txt}>{qoute}</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              setloding(true);
              getqoute();
            }}>
            <Image
              source={require('../../assests/Vector.png')}
              style={Styles.imgreload}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const Styles = StyleSheet.create({
    view: {
      // flex: 1,
      alignItems: 'center',
      width: '100%',
      height: 160,
      backgroundColor: 'black',
    },
    card: {
      flex: 1,
      padding: 15,
      margin: 15,
      backgroundColor: 'black',
      
      maxHeight: 140,
      width: "90%",
      borderWidth:2,
      borderColor: "white",
      
    },
    txt: {
      fontSize: 20,
      color: 'white',
      padding: 2,
      alignSelf: 'center',
    },
    imgreload: {
      flex: 1,
      top:5,
      bottom:70,
      height: 30,
      width: 30,
      position: 'absolute',
      alignSelf: 'flex-end',
      flexWrap: 'wrap'
    },
  });
  export default QuoteCard;
  