import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace:
    | {
        pickedLat: number;
        pickedLng: number;
      }
    | undefined;
  Map: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
