import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  PermissionsAndroid,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
// import auth from "@react-native-firebase/auth"
import auth, {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp5VZg7P-Pl4B7N3YeNv53iwp1Eram0T8",
  authDomain: "fir-db-1b8ab.firebaseapp.com",
  databaseURL: "https://fir-db-1b8ab-default-rtdb.firebaseio.com",
  projectId: "fir-db-1b8ab",
  storageBucket: "fir-db-1b8ab.appspot.com",
  messagingSenderId: "1063390238221",
  appId: "1:1063390238221:web:c08c2a57382f784adfe744",
  measurementId: "G-K32RFDP2ZY",
};
const app = initializeApp(firebaseConfig);
const authen = getAuth(app);
export default function Signorlog({ navigation }) {
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
  }, []);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [count, setCount] = useState(0);
  let adddata = () => {
    console.log("clicked");

    createUserWithEmailAndPassword(authen, email, password)
      .then((res) => {
        var user = authen.currentUser;

        console.log(user);
        sendEmailVerification(user).then((res) => {
          alert("verification mail is sent to your email");
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  const login = () => {
    signInWithEmailAndPassword(authen, email, password)
      .then((res) => {
        console.log(res);

        AsyncStorage.setItem("abcd", res["_tokenResponse"].email);
        AsyncStorage.setItem("uid", res["user"].uid);
        res["user"].emailVerified == true
          ? navigation.navigate("Home")
          : alert("verify your email");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="#b2daeb" />
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>
        Firebase Email Authentication
      </Text>
      <TextInput
        placeholder="Enter email"
        placeholderTextColor={"#5e6061"}
        value={email}
        style={styles.emailInput}
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        placeholder="Enter password"
        placeholderTextColor={"#5e6061"}
        value={password}
        style={styles.passInput}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableHighlight style={styles.createButton} onPress={() => adddata()}>
        <Text style={styles.buttontext}>Create Account</Text>
      </TouchableHighlight>
      <Text style={{ fontSize: 20, margin: 10 }}>OR</Text>
      <TouchableHighlight style={styles.createButton} onPress={() => login()}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b2daeb",
    alignItems: "center",
    justifyContent: "center",
  },
  emailInput: {
    height: 60,
    width: "80%",
    margin: 20,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  passInput: {
    height: 60,
    width: "80%",
    margin: 20,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    elevation: 10,
  },
  createButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "60%",
    backgroundColor: "#09a2ed",
    borderRadius: 10,
    elevation: 20,
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
