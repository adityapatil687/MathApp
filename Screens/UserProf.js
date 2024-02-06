import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";

const key = (props) => <Avatar.Icon {...props} icon="key" />;
const door = (props) => <Avatar.Icon {...props} icon="logout" />;

function UserProf({ navigation }) {
 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  const user = currentUser || {}; // Ensure user object is defined

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Card style={{ borderRadius: 15, margin: 50, backgroundColor: "#fff" }}>
        <Card.Cover
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require("../assets/def_prof.png")
          }
          style={{
            marginHorizontal: 30,
            marginVertical: 30,
            height: 180,
            width: 180,
            alignSelf: "center",
            borderRadius: 100,
          }}
        />
        <Card.Content>
          <Text
            variant="titleLarge"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 25,
              paddingBottom: 10,
            }}
          >
            {user.displayName ? user.displayName : "No Name"}
          </Text>
        </Card.Content>
      </Card>
      {/* <Card style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: "#fff" }}>
        <Card.Title
          left={key}
          title="Change Password"
          titleStyle={{ fontWeight: "bold", paddingTop: 4 }}
        />
      </Card> */}
      <Card
        style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: "#fff" }}
        onPress={() => {
          auth()
            .signOut()
            .then(() => navigation.navigate("Login"));
        }}
      >
        <Card.Title
          left={door}
          title="Logout"
          titleStyle={{ fontWeight: "bold", paddingTop: 4 }}
        />
      </Card>
    </SafeAreaView>
  );
}

export default UserProf;
