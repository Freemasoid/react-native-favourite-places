import { Image, StyleSheet, View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colours } from "@/constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";
import getMapPreview from "@/utils/location";

type PickedLocationType = {
  lat: number;
  lng: number;
};

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<PickedLocationType>({
    lat: 55.75583,
    lng: 37.6173,
  });
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  console.log(
    getMapPreview({
      lat: pickedLocation.lat,
      lng: pickedLocation.lng,
    })
  );

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}>
        <Image
          style={styles.image}
          source={{
            uri: getMapPreview({
              lat: pickedLocation.lat,
              lng: pickedLocation.lng,
            }),
          }}
        />
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          onPress={getLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon="map"
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
