import { Text, useFont } from "@shopify/react-native-skia";

interface Props {
  x: number;
  y: number;
  text: string;
}

function XAxisText({ x, y, text }: Props) {
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"));

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);

  return (
    <Text
      font={font}
      x={x - fontSize.width / 2}
      y={y}
      text={text}
      color={"#000"}
    />
  );
}

export default XAxisText;
