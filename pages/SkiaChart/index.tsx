import { Canvas, Group } from "@shopify/react-native-skia";
import {
  GestureResponderEvent,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as d3 from "d3";
import { AnimatedText, BarPath, XAxisText } from "@/components/SkiaChart";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";

type DataType = {
  label: string;
  day: string;
  value: number;
};

const data: DataType[] = [
  { label: "Mon", day: "월", value: 10 },
  { label: "Tue", day: "화", value: 20 },
  { label: "Wed", day: "수", value: 30 },
  { label: "Thu", day: "목", value: 40 },
  { label: "Fri", day: "금", value: 50 },
  { label: "Sat", day: "토", value: 60 },
  { label: "Sun", day: "일", value: 70 },
];

function SkiaChart() {
  const { width } = useWindowDimensions();
  const progress = useSharedValue(0);
  const selectedValue = useSharedValue(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);
  const [selectedDay, setSelectedDay] = useState("Total");
  const selectedBar = useSharedValue<string | null>(null);

  const canvasWidth = width;
  const canvasHeight = 350;
  const graphWidth = width;
  const graphMargin = 20;
  const graphHeight = canvasHeight - graphMargin;
  const barWidth = 28;

  /**
   * INFO: scalePoint는 범위를 domain 만큼 값을 균등하게 나눈다.
   * domain은 카테고리, range는 범위
   * ['월','화' ... '일'] , [0,70]이 있다면,
   * 월 - 0 , 화 - 10 , ... , 일 - 70
   */
  const xDomain = data.map((point) => point.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  /**
   * INFO: linear는 값을 선형적으로 매핑한다.
   * domian 데이터의 입력 범위, range는 출력값의 법위
   * Interpolate랑 비슷하게 [0,100] - [0,500] 이 있다면,
   * 0 = 0 , 10 = 50 , 20  = 100 , 100 = 500
   */
  const yDomain = [
    0,
    d3.max(data, (yDataPoint: DataType) => yDataPoint.value)!,
  ];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
    selectedValue.value = withTiming(totalValue, { duration: 1000 });
  }, []);

  const touchHandler = (e: GestureResponderEvent) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;
    const index = Math.floor((touchX - barWidth / 2) / x.step());

    if (index >= 0 && index < data.length) {
      const { label, value, day } = data[index];
      if (
        touchX > x(label)! - barWidth / 2 &&
        touchX < x(label)! + barWidth / 2 &&
        touchY > graphHeight - y(value) &&
        touchY < graphHeight
      ) {
        console.log({ label, value, day });
        setSelectedDay(day);
        selectedBar.value = label;
        selectedValue.value = withTiming(value);
      } else {
        setSelectedDay("Total");
        selectedBar.value = null;
        selectedValue.value = withTiming(totalValue);
        console.log("outside the bar");
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View>
          <Text>달려봐요!</Text>
          <AnimatedText selectedValue={selectedValue} />
          <Text>{selectedDay} 걸음 수</Text>
        </View>
        <Canvas
          style={{ width: canvasWidth, height: canvasHeight }}
          onTouchStart={touchHandler}
        >
          {data.map((dataPoint, index) => {
            return (
              <Group key={index}>
                <BarPath
                  x={x(dataPoint.label)}
                  y={y(dataPoint.value)}
                  barWidth={barWidth}
                  graphHeight={graphHeight}
                  progress={progress}
                  label={dataPoint.label}
                  selectedBar={selectedBar}
                />
                <XAxisText
                  x={x(dataPoint.label)!}
                  y={canvasHeight}
                  text={dataPoint.label}
                />
              </Group>
            );
          })}
        </Canvas>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default SkiaChart;
