import { Text, View, StyleSheet, Pressable } from "react-native";

export default function MyButton({ navigation, title, loginInBtnEvent }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#2761A2" : "#378AE8",
        },
        styles.btn,
      ] }
    
      onPress={() => loginInBtnEvent()}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    //backgroundColor: "#28D8A0",

    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 10,
    // paddingBottom: 10,
    padding: "4%",
    width: "80%",
    borderRadius: 10,
    // marginBottom: 20,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
