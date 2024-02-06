import { Text, View, StyleSheet, Pressable, Image } from "react-native";

export default function SocialLogin(param) {
  let x = parseInt(param.height);
  let y = parseInt(param.width);
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#f0f0f0" : "#fff",
        },
        styles.btn,
      ]}
      onPress={() => param.socialLoginBtnEvent(param.title)}
    >
      <View style={styles.socialLogoContainer}>
        <Image source={{ uri: param.url }} style={{ height: x, width: y }} />
        <Text style={styles.socialLogoTxt}>{param.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    marginBottom: "5%",
    borderWidth: 1,
  },
  socialLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  socialLogoTxt: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 15,
  },
  // socialLogo:
  // {
  //   height:30,
  //   width:30,
  // }
});
