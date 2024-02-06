import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

import TabDisplayContextProvider from "./context/TabDisplayContextProvider";
import UserDataContextProvider from "./context/UserDataContextProvider";

import Login from "./Screens/Login";
import LoginPaper from "./Screens/LoginPaper";
import TabNav from "./Screens/Nav/TabNav";
import Signup from "./Screens/Signup"

export default function App() {
  return (
    <>
    <StatusBar style="defauilt" />
    <UserDataContextProvider>
    <TabDisplayContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginPaper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabDisplayContextProvider>
  </UserDataContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
