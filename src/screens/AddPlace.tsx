import { Place } from "@/types/types";
import { PlaceForm } from "../components/places";
import { NavigationProp } from "@/types/navigation";

interface AddPlaceProps {
  navigation: NavigationProp;
}

function AddPlace({ navigation }: AddPlaceProps) {
  function createPlaceHandler(place: Place) {
    navigation.navigate("AllPlaces", { place: place });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
