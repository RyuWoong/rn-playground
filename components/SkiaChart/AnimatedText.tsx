import { Canvas, Text, useFont } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

interface Props {
  selectedValue: SharedValue<number>;
}

function AnimatedText({ selectedValue }: Props) {
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"));

  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  if (!font) {
    return null;
  }

  const fontSize = font.measureText("0");

  return (
    <Canvas style={{ height: fontSize.height + 40 }}>
      <Text
        font={font}
        text={animatedText}
        color={"#111"}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
}

export default AnimatedText;
