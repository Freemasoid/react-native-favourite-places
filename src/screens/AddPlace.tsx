import { Place } from "@/types/types";
import { PlaceForm } from "../components/places";
import { NavigationProp } from "@/types/navigation";
import { insertPlace } from "@/utils/database";

interface AddPlaceProps {
  navigation: NavigationProp;
}

function AddPlace({ navigation }: AddPlaceProps) {
  async function createPlaceHandler(place: Place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place: place });
    console.log(place);
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
