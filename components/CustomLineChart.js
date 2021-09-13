import React, { useState, useRef } from "react";

import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const CustomLineChart = ({ lineLabels, vacunacionDataLine }) => {
  return (
    <View>
      <LineChart
        data={{
          labels: lineLabels,
          datasets: [{ data: vacunacionDataLine }],
        }}
        width={Dimensions.get("window").width - 30} // from react-native
        height={Dimensions.get("window").height / 3.1}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
            width: 30,
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
          alignSelf: "center",
        }}
        withVerticalLabels={true}
        verticalLabelRotation={90}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
    color: "#111",
    textAlign: "center",
    padding: 10,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  cerrado: {
    display: "none",
  },
});
