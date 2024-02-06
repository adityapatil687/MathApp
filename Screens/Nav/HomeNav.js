import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

import Menu from "../Menu";
import Configure from "../Configure";
import ModeSelect from "../ModeSelect";
import Question from "../Questions";

export default function HomeNav({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Mode" component={ModeSelect} />
      <Stack.Screen name="Configure" component={Configure} />
      <Stack.Screen name="Questions" component={Question} />
    </Stack.Navigator>
  );
}
