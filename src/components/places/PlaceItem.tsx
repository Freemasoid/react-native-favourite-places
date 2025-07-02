import { Place } from "@/types/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PlaceItemProps {
  place: Place;
  onSelect: () => void;
}

function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({});
