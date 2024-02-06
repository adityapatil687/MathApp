import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Card(param) {
  return (
    <Pressable
      style={styles.container_1}
      onPress={() => {
        param.navScreenFunction(param.txt);
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: 5,
          marginBottom: 0,
          marginHorizontal: 5,
          borderRadius: 15,
          backgroundColor: param.color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {param.txt == "Cube" || param.txt == "Square" ? (
          param.txt == "Cube" ? (
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 70, lineHeight: 100, color: "white" }}>
                X
              </Text>
              {/*Superscript*/}
              <Text style={{ fontSize: 40, lineHeight: 50, color: "white" }}>
                3
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 70, lineHeight: 100, color: "white" }}>
                X
              </Text>
              {/*Superscript*/}
              <Text style={{ fontSize: 40, lineHeight: 50, color: "white" }}>
                2
              </Text>
            </View>
          )
        ) : (
          <Text style={styles.mySymbol}>{param.symbol}</Text>
        )}
      </View>
      <Text style={styles.inner_text}>{param.txt}</Text>
    </Pressable>
  );
}

const styles = new StyleSheet.create({
  container_1: {
    //flexDirection: "row",
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 200,
    width: 150,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 0.8,
    borderColor: '#D3D3D3',
    borderStyle: 'solid',
  },
  inner_flex: {
    flex: 1,
    marginTop: 5,
    marginBottom: 0,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: "#0FA3B1",
    justifyContent: "center",
    alignItems: "center",
  },
  mySymbol: {
    color: "white",
    //fontWeight: "bold",
    fontSize: 90,
  },
  inner_text: {
    textAlign: "center",
    fontWeight: "600",
    color: "black",
    padding: 5,
  },
});
