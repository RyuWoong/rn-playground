import { useLocalSearchParams, useNavigation } from "expo-router";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

function NavigationOptions({ children }: Props) {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: id });
  }, []);

  return children;
}

export default NavigationOptions;
