import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect} from 'react'

const Show = ({route,navigation}) => {
    const {date,journal}=route.params;
    useEffect(() => {
        navigation.setOptions({title: date})
    },[])
  return (
    <View style={styles.view}>
    <Text selectable={true} selectionColor='orange' style={styles.input}>{journal}</Text>
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
export default Show