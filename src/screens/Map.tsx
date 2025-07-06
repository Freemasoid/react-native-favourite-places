import { useCallback, useLayoutEffect, useState, useMemo } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { NavigationProp, RootStackParamList } from "@/types/navigation";
import { IconButton } from "@/components/ui";
import { RouteProp } from "@react-navigation/native";

type MapRouteProp = RouteProp<RootStackParamList, "Map">;

interface MapProps {
  navigation: NavigationProp;
  route: MapRouteProp;
}

function Map({ route, navigation }: MapProps) {
  const initialLocation = useMemo(() => {
    return (
      route.params && {
        lat: route.params.initialLat || 37.78825,
        lng: route.params.initialLng || -122.4324,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }
    );
  }, [route.params]);

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0.0,
    lng: 0.0,
  });

  const region = {
    latitude: initialLocation ? initialLocation.lat : 0.0,
    longitude: initialLocation ? initialLocation.lng : 0.0,
    latitudeDelta: initialLocation ? initialLocation.latitudeDelta : 0.0,
    longitudeDelta: initialLocation ? initialLocation.longitudeDelta : 0.0,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked", "You have to pick a loction first!");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={20}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {initialLocation && (
        <Marker
          title="Location"
          coordinate={{
            latitude: initialLocation.lat,
            longitude: initialLocation.lng,
          }}
        />
      )}
      {!initialLocation &&
        selectedLocation.lat !== 0.0 &&
        selectedLocation.lng !== 0.0 && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
