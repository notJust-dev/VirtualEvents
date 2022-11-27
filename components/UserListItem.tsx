import { Pressable, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useChatContext } from "../context/ChatContext";

type UserListItemProps = {
  user: any;
};

const UserListItem = ({ user }: UserListItemProps) => {
  const { startDMChatRoom } = useChatContext();

  return (
    <Pressable onPress={() => startDMChatRoom(user)} style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.image} />
      <Text style={styles.name}>{user.displayName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default UserListItem;
