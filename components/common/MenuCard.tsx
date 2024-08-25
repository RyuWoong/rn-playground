import { FontAwesome6 } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Text, Pressable } from "react-native";

export type Menu = { id: string; title: string };

interface Props {
  item: Menu;
  onPress: () => void;
}

function MenuCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.Container} onPress={onPress}>
      <Text style={{ flex: 1 }}>{item.title}</Text>
      <FontAwesome6 name="chevron-right" size={20} />
    </Pressable>
  );
}
export default MenuCard;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: "#fff",
  },
});
