import { PlacesList } from "@/components/places";
import { useIsFocused, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RootStackParamList } from "@/types/navigation";
import { Place } from "@/types/types";

type AllPlacesRouteProp = RouteProp<RootStackParamList, "AllPlaces">;

function AllPlaces({ route }: { route: AllPlacesRouteProp }) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params!.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
