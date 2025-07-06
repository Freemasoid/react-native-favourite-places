import { OutlinedButton } from "@/components/ui";
import { Colours } from "@/constants/colors";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, "PlaceDetails">;

interface PlaceDetailsProps {
  route: PlaceDetailsRouteProp;
}

function PlacesDetails({ route }: PlaceDetailsProps) {
  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {}, [selectedPlaceId]);

  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>ADDRESS</Text>
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
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
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
