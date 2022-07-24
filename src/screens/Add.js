import { View, Text,TextInput,StyleSheet,TouchableOpacity,ToastAndroid,
Image } from 'react-native'
import React,{useState,useContext,useEffect,useLayoutEffect}from 'react'
import Colors from '../../assests/Colours'
import {AuthContext} from '../lib/FirebaseAuth'
import { CreateJournal } from '../lib/Firestore'

const Add = ({navigation}) => {
     const [journal, setjournal] = useState('')
     const [date, setdate] = useState('')
     const {user} = useContext(AuthContext);
     useLayoutEffect(() => {
        // console.log("working")
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
            onPress={save}
            >
            <Image
            source={require('../../assests/save.png')}
            style={{
              width: 35,
              height: 35,
            }}
          />
          </TouchableOpacity>
          ),
        });
      }, [journal]);
    useEffect(() => {
        today();
    },[])

    let timer;
    const Debuance = (fn,delay)=>{
     if (timer) {
       clearTimeout(timer);
     }
     timer = setTimeout(fn,delay)
}


    const today = () => {
        const d = new Date()
        let n = (d.getMonth()+1).toString() ;
        let nn = (d.getDate()).toString() ;
        if(n.length < 2)
            n= "0"+n;
        if(nn.length < 2)
            nn= "0"+ nn;
        // console.log(3);
        const date = nn + "-" + n + "-" + ((d.getFullYear()).toString());
        setdate(date);
        navigation.setOptions({title: date})
        return(date) ;
        }

  const save = () => {
    if (journal == '') {
        alert('Please fill required fields.');
        return;

    }
    const uid = user.uid;
    // console.log(user.uid)
    CreateJournal(uid,date,journal);    
    navigation.navigate('Home')
  }
        
  return (
    <View style={styles.view}>
      <TextInput style={styles.input}  
                onChangeText={(text) => {Debuance(()=>{setjournal(text)},500)}}
                placeholder="Enter your journal here" 
                placeholderTextColor="white" 
                multiline={true}
                scrollEnabled={true}
                
                />
    </View>
  )
}
const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor: 'black',
        color: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
    
    },
    txt:{
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold', 
    },
    btn:{
        backgroundColor: 'black',
        height: 50,
        padding: 5,
        marginTop: 23,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'white',


    },
    input:{
        //borderColor: 'white',
        //borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 2,
        color: 'white',
        fontSize: 20,
        width: '100%',
        height: 600,
        textAlignVertical: 'top',
    }
})
export default Add