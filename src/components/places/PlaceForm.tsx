import { Colours } from "@/constants/colors";
import { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import LocationPicker from "./LocationPicker";
import { Button } from "../ui";
import { PickedLocation, Place } from "@/types/types";

function PlaceForm({
  onCreatePlace,
}: {
  onCreatePlace: (place: Place) => void;
}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState<PickedLocation>({
    lat: 0.0,
    lng: 0.0,
  });

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: PickedLocation): void => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    if (!selectedImage) {
      Alert.alert("No Image", "Please take a photo before saving the place.");
      return;
    }

    if (!enteredTitle.trim()) {
      Alert.alert("No Title", "Please enter a title for the place.");
      return;
    }

    const placeData: Place = {
      id: Math.random().toString(16).slice(2),
      title: enteredTitle,
      imageUri: selectedImage,
      address: pickedLocation?.address,
      location: { lat: pickedLocation.lat, lng: pickedLocation.lng },
    };

    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colours.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colours.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colours.primary100,
  },
});
