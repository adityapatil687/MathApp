import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
const ChatBot = () => {
  const genAI = new GoogleGenerativeAI("AIzaSyDdlrlZWPvQwCMU6KonxOY79Rw-gFYtLcA"); // Replace with your actual API key
  const [text, updateText] = useState("");
  const [chatData, updateChatData] = useState([
    { message: 'Welcome to the ChatBot!', id: '0', style: styles.serverSide, bubble: styles.serverMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);


  const generateResponse = async (input) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, something went wrong.";
    }
  };

  const submitHandler = async () => {
    if (text.trim() === "" || isLoading) return;

    setIsLoading(true);

    const userMessage = {
      message: text,
      id: Math.floor(Math.random() * 100) + 1,
      style: styles.clientSide,
      bubble: styles.clientMessage,
    };

    updateChatData((prevChatData) => [userMessage, ...prevChatData]);
    updateText("");

    try {
      const botResponse = await generateResponse(text);
      const botMessage = {
        message: botResponse,
        id: Math.floor(Math.random() * 100) + 1,
        style: styles.serverSide,
        bubble: styles.serverMessage,
      };
      updateChatData((prevChatData) => [botMessage, ...prevChatData]);
    } catch (error) {
      console.error("Error processing bot response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <SafeAreaView style={{ flex: 1 }}>
        {/* Chats */}
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          inverted={true}
          renderItem={({ item }) => (
            <View style={item.style}>
              <Text style={item.bubble}>{item.message}</Text>
            </View>
          )}
        />

        {/* Text input */}
        <View style={{ backgroundColor: "#fafafa", borderColor: "grey" }}>
          <View
            style={{
              height: 50,
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Type a message"
              style={styles.input}
              placeholderTextColor="#8D8D8D"
              onChangeText={(value) => updateText(value)}
              value={text}
            />
            <TouchableOpacity onPress={submitHandler} disabled={isLoading}>
              <View style={styles.sendButton}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ color: "white" }}>Send</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  clientSide: {
    alignItems: "flex-end",
  },
  clientMessage: {
    color: "black",
    padding: 10,
    fontSize: 15,
    textAlign: "right",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    margin: 5,
  },
  serverSide: {
    alignItems: "flex-start",
  },
  serverMessage: {
    color: "white",
    padding: 10,
    fontSize: 15,
    textAlign: "left",
    backgroundColor: "#006A5D",
    borderRadius: 10,
    margin: 5,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    fontSize: 15,
    height: 40,
    width: "87%",
    paddingLeft: 20,
    color: "black",
  },
  sendButton: {
    backgroundColor: "#006A5D",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default ChatBot;
