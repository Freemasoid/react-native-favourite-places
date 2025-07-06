import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllPlaces, Map, AddPlace, PlacesDetails } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import { IconButton } from "@/components/ui";
import { Colours } from "@/constants/colors";
import { RootStackParamList } from "@/types/navigation";
import { useEffect, useState } from "react";
import { initDb } from "@/utils/database";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initDb()
      .then(() => setDbInitialized(true))
      .catch((err) => console.log("Database init failed:", err));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colours.primary500,
            },
            headerTintColor: Colours.grey700,
            contentStyle: { backgroundColor: Colours.grey700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a new Place" }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlacesDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
