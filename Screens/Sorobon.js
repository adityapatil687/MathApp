import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Sorobon() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Text>Sorobon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
