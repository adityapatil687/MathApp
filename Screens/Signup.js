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
  // Function to handle sign up
  // Function to handle sign up
  // Function to handle sign up
  const signUpHandle = async () => {
    try {
      // Validate user inputs using regex
      const nameRegex = /^[a-zA-Z]+$/; // Only alphabets allowed in name
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^.{6,}$/;

      // Check if inputs are empty
      if (!firstName || !lastName || !email || !password) {
        Alert.alert("Empty Fields", "Please fill in all fields.");
        return;
      }

      // Check if name, email, and password meet regex requirements
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        Alert.alert("Invalid Name", "Name must contain only alphabets.");
        return;
      }

      if (!emailRegex.test(email)) {
        Alert.alert("Invalid Email", "Please provide a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        Alert.alert(
          "Invalid Password",
          "Password must be at least 6 characters long."
        );
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.sendEmailVerification();

      let imageURL; // Variable to store profile photo URL

      // Check if the user selected a profile photo
      if (profUrl.uri === require("../assets/def_prof.png").uri) {
        // If the user didn't select a profile photo, use the default one
        imageURL = profUrl.uri; // Default profile photo URL
      } else {
        // Upload profile image to Firebase Storage
        const imageURI = profUrl.uri;
        const fileExtension = imageURI.substring(imageURI.lastIndexOf("."));
        const imageName = `${user.uid}${fileExtension}`; // Use original file extension
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const ref = storage().ref().child(`profile_pic/${email}/${imageName}`);
        await ref.put(blob);

        // Get the URL of the uploaded image
        imageURL = await ref.getDownloadURL();
      }

      // Update user profile with collected information and image URL
      user.updateProfile({
        displayName: firstName + " " + lastName,
        photoURL: imageURL, // Set profile picture URL
      });

      Alert.alert(
        "Registration Complete",
        "Please check your email to verify your account before signing in."
      );

      // Navigate to the login screen
    } catch (error) {
      // Handle errors
      console.log("Error signing up: ", error.message);
      Alert.alert("Error signing up", error.message);
    }
    navigation.navigate("Login");
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
