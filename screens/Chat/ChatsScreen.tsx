import { View, Text } from "react-native";
import React from "react";
import { useChatContext } from "../../context/ChatContext";

const ChatsScreen = () => {
  const { username } = useChatContext();

  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
};

export default ChatsScreen;
