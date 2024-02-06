import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Card from "../components/card";
import { TabDisplayContext } from "../context/TabDisplayContextProvider";
import { useIsFocused } from "@react-navigation/native";

export default function ModeSelect({ navigation, route }) {
  const { operation } = route.params;
  const { tabDisplay, setTabDisplay } = useContext(TabDisplayContext);
  const { headerState, setHeaderState } = useContext(TabDisplayContext);

  const navScreenFunction = (str) => {
    if (str == "Perfect Number" || str == "Float Number") {
      navigation.navigate("Configure", {
        mode: str,
        operation: operation,
      });
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused == true) {
      setTabDisplay("none");
      setHeaderState(false);
    }
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <>
        <View style={styles.innerContainer}>
          <Text style={styles.modeSelectLabel}>Select one type</Text>
          <View style={styles.choiceHorizontal}>
            <Card
              txt="Perfect Number"
              symbol="3"
              color="#4596F2"
              navScreenFunction={navScreenFunction}
            />
            <Card
              txt="Float Number"
              symbol="0.5"
              color="#4596F2"
              navScreenFunction={navScreenFunction}
            />
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#ffffff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modeSelectLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  choiceHorizontal: {
    flexDirection: "row",
  },
});
