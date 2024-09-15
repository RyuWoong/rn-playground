import { MenuCard } from "@/components/common";
import { Menu } from "@/components/common/MenuCard";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MenuList: Menu[] = [
  { id: "inputInScrollView", title: "Auto Scroll to Input" },
  { id: "skiaChart", title: "skiaChart" },
];

const keyExtractor = (item: Menu) => `${item.id}`;

export default function Index() {
  const router = useRouter();
  const renderItem = useCallback<ListRenderItem<Menu>>(
    ({ item }) => {
      return (
        <MenuCard
          item={item}
          onPress={() =>
            router.navigate({
              pathname: "/(category)/[id]",
              params: { id: item.id },
            })
          }
        />
      );
    },
    [router]
  );

  return (
    <SafeAreaView style={styles.Container}>
      <FlatList
        data={MenuList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.List}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: "#fff" },
  List: {
    flexGrow: 1,
    backgroundColor: "#ececec",
  },
});
