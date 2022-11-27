import React from "react";
import { useChatContext } from "../../context/ChatContext";
import { ChannelList } from "stream-chat-expo";
import { Channel } from "stream-chat";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const { setCurrentChannel } = useChatContext();

  const navigation = useNavigation();

  const onSelect = (chanel: Channel) => {
    setCurrentChannel(chanel);
    navigation.navigate("ChatRoom");
  };

  return <ChannelList onSelect={onSelect} />;
};

export default ChatsScreen;
