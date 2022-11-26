import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Agenda, AgendaEntry, AgendaSchedule } from "react-native-calendars";
import { gql, useQuery } from "@apollo/client";

const GetEvents = gql`
  query GetEvents {
    Event {
      id
      name
      date
    }
  }
`;

const getEventsSchedule = (events: []): AgendaSchedule => {
  const items: AgendaSchedule = {};

  events.forEach((event) => {
    const day = event.date.slice(0, 10);

    if (!items[day]) {
      items[day] = [];
    }
    items[day].push({ ...event, day, height: 50 });
  });

  return items;
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { data, loading, error } = useQuery(GetEvents);

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable
        style={[styles.item, { height: reservation.height }]}
        onPress={() => navigation.navigate("Modal", { id: reservation.id })}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Error fetching events", error.message);
  }

  const events = getEventsSchedule(data.Event);

  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        selected="2022-11-24"
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
