import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Place } from "./types";

export type RootStackParamList = {
  AllPlaces: { place: Place } | undefined;
  AddPlace:
    | {
        pickedLat: number;
        pickedLng: number;
      }
    | undefined;
  Map: {
    initialLat?: number;
    initialLng?: number;
  };
  PlaceDetails: {
    placeId: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
