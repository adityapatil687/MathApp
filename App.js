import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";

import UserStateContextProvider, {
  UserStateContext,
} from "./context/UserStateContextProvider";
import TabDisplayContextProvider from "./context/TabDisplayContextProvider";
import Login from "./Screens/Login";
import LoginPaper from "./Screens/LoginPaper";
import TabNav from "./Screens/Nav/TabNav";
import Signup from "./Screens/Signup";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserStateContextProvider>
      <AppContent />
    </UserStateContextProvider>
  );
}

function AppContent() {
  const { isSignedIn, setIsSignedIn } = useContext(UserStateContext);

  return (
    <View style={styles.container}>
      <StatusBar style="defauilt" />
      <TabDisplayContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: true,
              cardOverlayEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            {isSignedIn === true ? (
              <>
                <Stack.Screen
                  name="TabNav"
                  component={TabNav}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginPaper}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{ headerShown: false }}
                />
              </>
            )}
           
          </Stack.Navigator>
        </NavigationContainer>
      </TabDisplayContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
