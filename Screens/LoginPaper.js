import React, { useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";

import MyButton from "../components/button";
import SocialLogin from "../components/socialLoginBtn";

import { UserDataContext } from "../context/UserDataContextProvider";



export default function Login({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(()=>{},[])

  const loginInBtnEvent = () => {
    if (email.trim() === "" || pass.trim() === "") {
      alert("Please enter both email and password");
      return;
    } else {
     
    }
  };

  const socialLoginBtnEvent = (str) => {
    // Perform your social login logic here
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.TextInputGroup}>
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.InputEmail}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.InputPass}
              onChangeText={(text) => setPass(text)}
              secureTextEntry
            />
          </View>
          <MyButton title="LOGIN" loginInBtnEvent={loginInBtnEvent} />
          <Text style={styles.signInWith}>or sign in with</Text>
          <View style={styles.partners}>
            <SocialLogin
              socialLoginBtnEvent={socialLoginBtnEvent}
              title="Sign in with Google"
              url="https://img.icons8.com/color/48/null/google-logo.png"
              height="30"
              width="30"
            />
          </View>
          <Pressable
            style={styles.signupContainer}
            children={({ pressed }) => (
              <>
                <Text>Didn't have an account?</Text>
                <Text style={{ color: pressed ? "#2761A2" : "#378AE8" }}>
                  {" "}
                  signup
                </Text>
              </>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInputGroup: {
    width: "80%",
    marginBottom: 30,
  },
  InputEmail: {
    marginBottom: 10,
    height: 50,
  },
  partners: {
    marginVertical: "3%",
  },
  signInWith: {
    marginVertical: "3%",
    color: "#378AE8",
  },
  signupContainer: {
    flexDirection: "row",
  },
});
