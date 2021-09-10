import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

export const Dashboard = () => {
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());
  const [openDesde, setOpenDesde] = useState(false);
  const [openHasta, setOpenHasta] = useState(false);
  const [vacuna, setVacuna] = useState("");
  const [vacunaOpen, setVacunaOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Desde" onPress={() => setOpenDesde(true)} />
        <Button title="Hasta" onPress={() => setOpenHasta(true)} />
        <Button title="Vacuna" onPress={() => setVacunaOpen(!vacunaOpen)} />
      </View>
      <View style={[vacunaOpen ? null : styles.cerrado]}>
        <Picker
          selectedValue={vacuna}
          onValueChange={(itemValue, itemIndex) => setVacuna(itemValue)}
        >
          <Picker.Item label="Sputnik V" value="s" />
          <Picker.Item label="Covishield" value="c" />
        </Picker>
      </View>

      <DatePicker
        modal
        open={openDesde}
        date={desde}
        onConfirm={(date) => {
          setOpenDesde(false);
          setDesde(date);
        }}
        onCancel={() => {
          setOpenDesde(false);
        }}
      />

      <DatePicker
        modal
        open={openHasta}
        date={hasta}
        onConfirm={(date) => {
          setOpenHasta(false);
          setHasta(date);
        }}
        onCancel={() => {
          setOpenHasta(false);
        }}
      />

      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={350}
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
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"40"}
        center={[10, 25]}
        absolute
      />
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
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
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Button title="Detalle" />
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
