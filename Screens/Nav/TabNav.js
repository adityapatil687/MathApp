
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons"; /// serverity
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import HomeNav from "./HomeNav";
import UserProf from "../UserProf";
import ChatBot from "../ChatBot";
import Video from "../Video";

import {TabDisplayContext} from "../../context/TabDisplayContextProvider";
import { useState, useContext } from "react";
import Videos from "../Video";


export default function TabNav({ navigation }) {
  const {tabDisplay, setTabDisplay} = useContext(TabDisplayContext);
  const { headerState, setHeaderState } = useContext(TabDisplayContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }else if (route.name === "Chat")
          {
            iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"
          }else if (route.name === "Video") {
            iconName = focused ? "videocam" : "videocam-outline"; // Change this to the appropriate Ionicons name for your video icon
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#924CFC",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        
        tabBarStyle: [
          {
            display: tabDisplay,
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{ headerShown: headerState, title: 'Select exercise', tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProf}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatBot}
        options={{ headerShown: false  }}
      />
      <Tab.Screen
        name="Video"
        component={Videos}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
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
