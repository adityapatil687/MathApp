import * as React from "react";
import { Avatar, Button, Card, Text, } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const key = (props) => <Avatar.Icon {...props} icon="key" />;
const door = (props) => <Avatar.Icon {...props} icon="logout" />;

const UserProf = () => (
  <SafeAreaView>
    <Card style={{ borderRadius: 15, margin: 50 }}>
      {/* <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      /> */}
      <Card.Cover
        source={require("../assets/avatar.png")}
        style={{
          marginHorizontal: 30,
          marginVertical: 30,
          height: 187,
          width: 170,
          alignSelf: "center",
          borderRadius: 100
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
          John Doe
        </Text>
      </Card.Content>
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
    <Card style={{marginHorizontal: 20, marginVertical: 10}}>
        <Card.Title left={key} title="Change Password" titleStyle={{fontWeight: "bold", paddingTop: 4}}/>
    </Card>
    <Card style={{marginHorizontal: 20, marginVertical: 10}}>
        <Card.Title left={door} title="Logout" titleStyle={{fontWeight: "bold", paddingTop: 4}}/>
    </Card>
  </SafeAreaView>
);

export default UserProf;
