import { Colours } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface OutlinedButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  children: string;
  onPress: () => void;
}

function OutlinedButton({ icon, children, onPress }: OutlinedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colours.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colours.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: { marginRight: 6 },
  text: { color: Colours.primary500 },
});
