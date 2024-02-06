import React, { useState } from "react";
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { TextInput, Avatar } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker"; // Import ImagePicker library
import MyButton from "../components/button";
import auth from "@react-native-firebase/auth"; // Import Firebase authentication
import storage from "@react-native-firebase/storage"; // Import Firebase storage

const Signup = ({ navigation }) => {
  const [profUrl, setProfUrl] = useState(require("../assets/def_prof.png")); // state for profile_pic
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  // Function to handle image picking
  const handleImageUpload = () => {
    const options = {
      title: "Select Profile Picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (!response.assets || response.assets.length === 0) {
        console.log("No image selected");
      } else {
        const selectedImage = response.assets[0];
        if (selectedImage.uri) {
          setProfUrl({ uri: selectedImage.uri });
        } else {
          console.log("Selected image URI is null");
        }
      }
    });
  };

  // Function to handle sign up
  const signUpHandle = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.sendEmailVerification();
      // Upload profile image to Firebase Storage
      const imageURI = profUrl.uri;
      const imageName = `${user.uid}.png`; // Unique image name based on user's UID
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const ref = storage().ref().child(`profile_pic/${email}/${imageName}`);
      await ref.put(blob);

      // Get the URL of the uploaded image
      const imageURL = await ref.getDownloadURL();

      // Update user profile with collected information and image URL
      await user.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: imageURL, // Set profile picture URL
      });

      Alert.alert(
        "Registration Complete",
        "Please check your email to verify your account before signing in."
      );

      // Navigate to the login screen
      navigation.navigate("Login");
    } catch (error) {
      // Handle errors
      console.log("Error signing up: ", error.message);
      Alert.alert("Error signing up", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.myForm}>
          <TouchableWithoutFeedback onPress={handleImageUpload}>
            <Avatar.Image
              size={180}
              source={profUrl}
              style={{
                backgroundColor: "#fff",
                alignSelf: "center",
                marginBottom: 20,
              }}
            />
          </TouchableWithoutFeedback>
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <MyButton
          loginInBtnEvent={signUpHandle}
          title="Sign up"
          height="30"
          width="30"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  myForm: {
    width: "80%",
    gap: 5,
  },
  input: {
    height: 50,
  },
});
