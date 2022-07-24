import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './FirebaseAuth';
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  Modal
} from 'react-native';
import Colors from '../../assests/Colours';

export const CreateJournal = async (userID, date, dataNew) => {
  firestore()
    .collection('Journal')
    .doc(userID)
    .get()
    .then(documentSnapshot => {
      if (!documentSnapshot.exists) {
        firestore()
          .collection('Journal')
          .doc(userID)
          .set({
            journals: [{date: date, journal: dataNew}],
          })
          .then(() => {
            ToastAndroid.show(
              'Journal Saved successfully!',
              ToastAndroid.SHORT,
            );
          });
      } else {
        const data = documentSnapshot.data().journals;
        firestore()
          .collection('Journal')
          .doc(userID)
          .set({
            journals: [...data, {date: date, journal: dataNew}],
          })
          .then(() => {
            ToastAndroid.show(
              'Journal Saved successfully!',
              ToastAndroid.SHORT,
            );
          });
      }
    });
  // console.log(user)
  // console.log(user.data().journals);
  // const data = user.data().journals;
};

const Firestore = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext);
  const userID = user.uid;

  useEffect(() => {
    const subscriber = firestore()
      .collection('Journal')
      .doc(userID)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setData(documentSnapshot.data().journals);
        }
        //     console.log('User data: ', documentSnapshot.data().journals);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userID]);
  const renderItem = ({item}) => {
    //console.log(item.key);
    const open =()=>{
      //console.log(item.journal)
      navigation.navigate("Show",{
        date:item.date,
        journal:item.journal
      });
    }
    return (
      <TouchableOpacity
      onPress={open}
      onLongPress={()=>{
        setModalVisible(true);
      }}
      >
      <View style={styles.box}>
        <Text style={styles.Txt}>{item.date}</Text>
        <Text style={[styles.Txt,styles.txtb]}>{item.journal}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  const _emptyComponent = () => {
    return (
      <View style={styles.nonote}>
        <Text style={{color: 'white', fontSize: 20}}>
          Click on Todays journal icon to make new note!
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={_emptyComponent}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>{}} >
              <Text style={styles.textStyle}>Delete Note !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    height: 100,
    width: 350,
    margin: 10,
    padding: 10,
    overflow:'hidden'
  },
  Txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nonote: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.GRAY,
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: Colors.bg,
  },
  buttonClose: {
    backgroundColor: Colors.AQUA_GREEN,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },txtb:{
    maxHeight:50
  }
});

export default Firestore;
