import React, { useEffect, useState, useContext } from "react";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";

import MyButton from "../components/button";
import SocialLogin from "../components/socialLoginBtn";
import {} from "react-native-safe-area-context";

import { UserStateContext } from "../context/UserStateContextProvider";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { isSignedIn, setIsSignedIn } = useContext(UserStateContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1045187514628-nsqi06enmplpf40j2ika834climb1lp7.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
     // offlineAccess: true,
    });
  }, []);

  const loginInBtnEvent = () => {
    if (email.trim() === "" || pass.trim() === "") {
      alert("Please enter both email and password");
      return;
    } else {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            // navigation.navigate("TabNav");
            setIsSignedIn(true);
          } else {
            alert("Please verify your email before signing in.");
            auth().signOut(); // Sign out the user if email is not verified
          }
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            alert("No user found with this email address!");
          } else if (error.code === "auth/wrong-password") {
            alert("Incorrect password!");
          } else {
            alert(error);
          }
        });
    }
  };

  const socialLoginBtnEvent = async () => {
    // Perform your social login logic here
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      await auth().signInWithCredential(googleCredential);
      // navigation.navigate("TabNav");
      setIsSignedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in flow
        console.log("User cancelled the sign-in flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Another sign-in operation is in progress
        console.log("Another sign-in operation is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        console.log("Play services not available or outdated");
      } else {
        // Some other error occurred
        console.error("Google Sign-In Error:", error);
      }
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../assets/loginArt.jpg")}
            style={styles.loginArt}
          />
          <View style={styles.TextInputGroup}>
            <TextInput
              label="Email"
              mode="outlined"
              activeOutlineColor="#296ab3"
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
            onPress={() => {
              navigation.navigate("Signup");
            }}
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
        </SafeAreaView>
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
  loginArt: {
    width: 300, // Adjust width as needed
    height: 300, // Adjust height as needed
    resizeMode: "contain", // Or adjust resizeMode as needed
  },
});
