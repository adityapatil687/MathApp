import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Text,
  Button,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("videos")
      .orderBy("index") // Order by the 'index' field
      .onSnapshot(
        (querySnapshot) => {
          if (!querySnapshot) {
            console.log("Query snapshot is null.");
            return;
          }

          const videosData = [];
          querySnapshot.forEach((doc) => {
            // Extract data from each document
            const { index, title, url, thumbnail } = doc.data();
            videosData.push({
              id: doc.id, // Use document ID as unique key
              index: index,
              title: title,
              url: url,
              thumbnail: thumbnail,
            });
          });
          setVideos(videosData);
        },
        (error) => {
          console.error("Error fetching videos:", error);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleVideoPress = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsModalVisible(true);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleVideoPress(item.url)}
              style={{
                flexDirection: "row",
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#e7e7e7",
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: width * 0.35,
                  height: height * 0.1,
                  marginRight: 10,
                }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          style={{}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Video
              source={{ uri: selectedVideoUrl }}
              style={{
                width: width * 0.9,
                height: height * 0.7,
                borderRadius: 10,
              }}
              resizeMode="contain"
              useNativeControls
              shouldPlay={isModalVisible}
              isLooping
            />
            <IconButton
              icon="close"
              color="#ffffff"
              size={30}
              onPress={() => setIsModalVisible(false)}
              style={{ position: "absolute", top: 20, right: 20 }}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
}
