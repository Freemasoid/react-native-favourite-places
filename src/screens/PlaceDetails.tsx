import { OutlinedButton } from "@/components/ui";
import { Colours } from "@/constants/colors";
import { NavigationProp, RootStackParamList } from "@/types/navigation";
import { Place } from "@/types/types";
import { fetchPlaceDetails } from "@/utils/database";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, "PlaceDetails">;

interface PlaceDetailsProps {
  route: PlaceDetailsRouteProp;
  navigation: NavigationProp;
}

function PlacesDetails({ route, navigation }: PlaceDetailsProps) {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace?.location.lat,
      initialLng: fetchedPlace?.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {fetchedPlace?.imageUri ? (
        <Image
          style={styles.image}
          source={{ uri: fetchedPlace.imageUri }}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>

        <OutlinedButton
          icon="map"
          onPress={showOnMapHandler}
        >
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlacesDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  imagePlaceholder: {
    backgroundColor: Colours.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: Colours.primary700,
    fontSize: 18,
    fontWeight: "bold",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colours.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
