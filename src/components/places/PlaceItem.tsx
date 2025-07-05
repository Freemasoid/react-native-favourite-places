import { Colours } from "@/constants/colors";
import { Place } from "@/types/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PlaceItemProps {
  place: Place;
  onSelect: () => void;
}

function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image
        style={styles.image}
        source={{ uri: place.imageUri }}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colours.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
  },
  info: {
    flex: 2,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colours.grey700,
  },
  address: {
    fontSize: 12,
    color: Colours.grey700,
  },
});
