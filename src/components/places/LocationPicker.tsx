import { Image, StyleSheet, View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colours } from "@/constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import getMapPreview from "@/utils/location";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";
import { NavigationProp, RootStackParamList } from "@/types/navigation";

type PickedLocationType = {
  lat: number;
  lng: number;
};

type AddPlaceRouteProp = RouteProp<RootStackParamList, "AddPlace">;

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState<PickedLocationType>({
    lat: 55.75583,
    lng: 37.6173,
  });
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddPlaceRouteProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

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

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

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
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
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
