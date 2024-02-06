import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    img: require("../assets/YTThumbnail.png"),
    title: "First Item",
    sub: "Ipsum Lorem deserunt cupidatat tempor. Lorem deserunt magna consequat nisi. Ullamco veniam officia enim eiusmod non nisi duis nostrud sunt quis et. Eu anim sint commodo eu dolore elit laborum ad nisi tempor quis mollit officia.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    img: require("../assets/YTThumbnail.png"),
    title: "Second Item",
    sub: "Ipsum Lorem deserunt cupidatat tempor. Lorem deserunt magna consequat nisi. Ullamco veniam officia enim eiusmod non nisi duis nostrud sunt quis et. Eu anim sint commodo eu dolore elit laborum ad nisi tempor quis mollit officia.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    img: require("../assets/YTThumbnail.png"),
    title: "Third Item",
    sub: "Ipsum Lorem deserunt cupidatat tempor. Lorem deserunt magna consequat nisi. Ullamco veniam officia enim eiusmod non nisi duis nostrud sunt quis et. Eu anim sint commodo eu dolore elit laborum ad nisi tempor quis mollit officia.",
  },
];

export default function Video() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      {/* <Text>Video</Text> */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => <VideoCard title={item.title} sub={item.sub} id={item.id} img={item.img} />}
        keyExtractor={(item) => item.id}
      />
      {/* <VideoCard /> */}
    </SafeAreaView>
  );
}

function VideoCard({title, sub, id, img}) {
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#e7e7e7",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 12,
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.thumbnail}
            source={img}
          />

          <View style={{ width: "60%", marginLeft: 10, flexWrap: "no-wrap" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {title}
            </Text>
            <Text style={{ fontSize: 10, marginTop: 3 }}>
              {sub}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  thumbnail: {
    height: 100,
    width: "40%",
    borderRadius: 10,
  },
});
