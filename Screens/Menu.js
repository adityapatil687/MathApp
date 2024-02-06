import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Card from "../components/card";
import { TabDisplayContext } from "../context/TabDisplayContextProvider";
import { useIsFocused } from '@react-navigation/native';

export default function Menu({ navigation, route }) {
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused == true)
    {
      setTabDisplay("flex");
      setHeaderState(true);
    }
  });
  const [data, setData] = useState([
    {
      id: "1",
      title: "Addition",
      Opeator: "+",
      backgroundColor: "#E691FB",
    },
    {
      id: "2",
      title: "Cube",
      Opeator: "x^​3",
      backgroundColor: "#0FA3B1",
    },
    {
      id: "3",
      title: "Division",
      Opeator: "÷",
      backgroundColor: "#62BCFF",
    },
    {
      id: "4",
      title: "Square Root",
      Opeator: "√",
      backgroundColor: "#9A275A",
    },
    {
      id: "5",
      title: "Cube Root",
      Opeator: "∛",
      backgroundColor: "#FC5F5F",
    },
    {
      id: "6",
      title: "Square",
      Opeator: "x^​2",
      backgroundColor: "#924CFC",
    },
    {
      id: "7",
      title: "Subtraction",
      Opeator: "-",
      backgroundColor: "#FF9B36",
    },
    {
      id: "8",
      title: "Multiplication",
      Opeator: "×",
      backgroundColor: "#5A8BBC",
    },
    {
      id: "9",
      title: "Percentage",
      Opeator: "%",
      backgroundColor: "#499E5F",
    },
  ]);
  const navScreenFunction = (str) => {
    navigation.navigate("Mode", { operation: str });
    console.log(str);
  };

  const { tabDisplay, setTabDisplay } = useContext(TabDisplayContext);
  const {headerState, setHeaderState} = useContext(TabDisplayContext);
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.myList}>
        <FlatList
          style={{ }}
          data={data}
          numColumns="2"
          renderItem={({ item }) => (
            <Card
              txt={item.title}
              navScreenFunction={navScreenFunction}
              symbol={item.Opeator}
              color={item.backgroundColor}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: "#ffffff",
    marginTop: StatusBar.currentHeight
  },
  myList: {
    alignItems: "center",
  },
});
