import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "@/types/types";
import PlaceItem from "./PlaceItem";
import { Colours } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/types/navigation";

interface PlacesListProps {
  places: Place[];
}

function PlacesList({ places }: PlacesListProps) {
  const navigation = useNavigation<NavigationProp>();

  function selectPlaceHandler(id: string) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

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
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() => selectPlaceHandler(item.id)}
        />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
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
