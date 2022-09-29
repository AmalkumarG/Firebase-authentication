import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import Signorlog from "./signorlog";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
const Stack=createNativeStackNavigator()

 function MyStack(){
  const [item,setitem]=useState("ac")
  useEffect(()=>{
    var abcd=AsyncStorage.getItem("abcd")
    var a=abcd.length
    setitem(a)

  },[])
  return(
<Stack.Navigator>
<Stack.Screen name="signOrlog" component={Signorlog} options={{headerShown:false}}/>
<Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>





    

  
  
  
  




  </Stack.Navigator>
    
  )
  
  
}

export default App=()=>{
  return(
<NavigationContainer>
    <MyStack/>
  </NavigationContainer>
  )
  
}