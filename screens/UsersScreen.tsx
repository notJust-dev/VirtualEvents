import { View, Text, FlatList, ActivityIndicator } from "react-native";
import UserListItem from "../components/UserListItem";
import { gql, useQuery } from "@apollo/client";

const GetUser = gql`
  query GetUsers {
    users {
      id
      displayName
      avatarUrl
    }
  }
`;

const UsersScreen = () => {
  const { data, loading, error } = useQuery(GetUser);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  console.log(JSON.stringify(data, null, 2));

  return (
    <FlatList
      data={data.users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UsersScreen;
