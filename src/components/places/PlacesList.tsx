import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "@/types/types";
import PlaceItem from "./PlaceItem";
import { Colours } from "@/constants/colors";

interface PlacesListProps {
  places: Place[];
}

function PlacesList({ places }: PlacesListProps) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colours.primary200,
  },
});
