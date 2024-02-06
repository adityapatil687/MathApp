import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";

import MyButton from "../components/button";
import SocialLogin from "../components/socialLoginBtn";

export default function Login({ navigation }) {
  const [userData, setUserData] = useState({});
  const [isLogIn, setLogIn] = useState(false);

  const loginInBtnEvent = () => {
    // alert("Custom Login Button Logic");
    let user;
    user = {
      first_name: "Aditya",
      last_name: "Patil",
    };
    setUserData(user);
    if (user) {
      navigation.replace("TabNav", {
        first_name: "Aditya",
        last_name: "Patil",
      });
    }
  };

  const socialLoginBtnEvent = (str) => {
    // alert(str);
    let user;
    user = {
      first_name: "Aditya",
      last_name: "Patil",
    };
    setUserData(user);
    if (user) {
      navigation.navigate("TabNav");
    }
  };
  return (
    <>
    <StatusBar barStyle="default" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.myTitle1}>LOG</Text>
            <Text style={styles.myTitle2}>IN</Text>
          </View>

          <TextInput
            style={styles.myInput}
            placeholder="enter email"
            placeholderTextColor="grey"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.myInput}
            placeholder="enter password"
            placeholderTextColor="grey"
          />

          <Pressable
            style={styles.frgtPass}
            children={({ pressed }) => (
              <Text style={{ color: pressed ? "#2761A2" : "#378AE8" }}>
                forgot password ?
              </Text>
            )}
          />

          <MyButton title="LOGIN" loginInBtnEvent={loginInBtnEvent} />

          <Text style={styles.signInWith}>or sign in with</Text>

          <View>
            <SocialLogin
              socialLoginBtnEvent={socialLoginBtnEvent}
              title="Sign in with Google"
              url="https://img.icons8.com/color/48/null/google-logo.png"
              height="30"
              width="30"
            />
            <SocialLogin
              socialLoginBtnEvent={socialLoginBtnEvent}
              title="Sign in with Facebook"
              url="https://img.icons8.com/fluency/48/null/facebook-new.png"
              height="30"
              width="30"
            />
            <SocialLogin
              socialLoginBtnEvent={socialLoginBtnEvent}
              title="Sign in with Apple ID"
              url="https://img.icons8.com/ios-glyphs/30/null/mac-os.png"
              height="30"
              width="30"
            />
          </View>

          <Pressable
            style={styles.signupContainer}
            children={({ pressed }) => (
              <>
                <Text>Didn't have account ?</Text>
                <Text style={{ color: pressed ? "#2761A2" : "#378AE8" }}>
                  {" "}
                  signup
                </Text>
              </>
            )}
          />

          <Text
            style={{
              color: "#959595",
              textAlign: "center",
              backgroundColor: "#ffffff",
              marginTop: 50,
            }}
          >
            Copyritght All rights reserved
          </Text>
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
  titleContainer: {
    paddingTop: "2%",
    flexDirection: "row",
    // marginBottom: 35,
    marginTop: StatusBar.currentHeight,
  },
  myTitle1: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#000000",
    //lineHeight: 60,
    // marginBottom: 35,
  },
  myTitle2: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#378AE8",
    //lineHeight: 60,
    // marginBottom: 36
  },
  myInput: {
    //display: "block",   // cause system crash on android
    width: "80%",
    padding: "4%",
    // padding: "4%",
    borderRadius: 10,
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#757575",
    fontSize: 16,
    marginBottom: "5%",
    //height: 48
  },

  frgtPass: {
    marginBottom: "5%",
    alignSelf: "flex-end",
    marginRight: "10%",
  },
  signInWith: {
    marginVertical: "5%",
    color: "#378AE8",
  },
  signupContainer: {
    flexDirection: "row",
  },
});
