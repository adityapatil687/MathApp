import { SafeAreaView, Keyboard, Button, Pressable, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TextInput, Avatar } from "react-native-paper";
import MyButton from "../components/button";
const Signup = () => {
  const [profUrl, setProfUrl] = useState(require("../assets/avatar.png"));
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.myForm}>
        <Avatar.Image
          size={180}
          source={profUrl}
          style={{ backgroundColor: "#fff", alignSelf: "center", marginBottom: 20 }}
        />
        
          <TextInput
            label="First Name"
            mode="outlined"
            style={styles.InputFirstName}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            style={styles.InputFirstName}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.InputFirstName}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.InputFirstName}
            onChangeText={(text) => setEmail(text)}
          />
        
      </View>
        <MyButton title="Sign up" height="30" width="30" />
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
    gap: 30
  },
  myForm: {
   width: '80%',
   gap: 5
  },
  InputFirstName: {
    height: 50
  }
});
