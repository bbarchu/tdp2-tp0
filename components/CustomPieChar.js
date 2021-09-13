import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { PieChart } from "react-native-chart-kit";

export const CustomPieChart = ({ data, accessor }) => {
  return (
    <View>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height / 3}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        accessor={accessor}
        backgroundColor={"transparent"}
        paddingLeft={"40"}
        center={[10, 25]}
        absolute
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
