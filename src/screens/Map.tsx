import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

function Map() {
  const region = {
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  };

  return <MapView style={styles.map} initialRegion={region}></MapView>;
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
