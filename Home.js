import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({navigation}) => {
  const [item,setitem]=useState()
  const [uid,setuid]=useState()
 useEffect(async()=>{
  var a=await AsyncStorage.getItem("abcd")
  var b=await AsyncStorage.getItem("uid")
  setitem(a)
  setuid(b)
 },[])
  return (
    <View style={styles.container}>
    <Text style={{fontSize:30,fontWeight:"bold",top:10,position:"absolute"}}>Welcome User</Text>
      <Text style={{fontSize:20,color:"green",margin:10}}>Email: {item}</Text>
      <Text style={{fontSize:18,color:"green",margin:10}}>userID: {uid}</Text>
      <TouchableHighlight style={{position:"absolute",bottom:10,backgroundColor:"blue",height:40,
      width:"60%",justifyContent:"center",alignItems:"center",borderRadius:10}}>
        <Text style={{fontSize:20,fontWeight:"bold"}} onPress={()=>navigation.navigate("signOrlog")}>Logout</Text>
      </TouchableHighlight>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
   justifyContent:"center",
    alignItems:"center"
  }
})