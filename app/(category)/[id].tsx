import InputInScrollView from "@/pages/InputInScrollView";
import SkiaChart from "@/pages/SkiaChart";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

function Category() {
  // 오늘은 뭐가 좋을까?

  const { id } = useLocalSearchParams();

  if (id === "inputInScrollView") {
    return <InputInScrollView />;
  }

  if (id === "skiaChart") {
    return <SkiaChart />;
  }
  return <Text>{id}</Text>;
}

export default Category;
