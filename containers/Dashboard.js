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
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

const COLLECTION_NAME = "vacunacion";
const APIKEY = "tdp2tp02021";
const URL = "https://tdp2server.herokuapp.com/vacunacion?key=" + APIKEY;


function yyyymm(date) {
  var mm = date.getMonth() + 1;
  var dd = date.getDate();

  return parseInt([date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
         ].join(''), 10);
}

function sortObjectByKeys(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function filterData(data, desde, hasta, vacuna) {
    
  var output = {
      data: [],
      dosis1: 0,
      dosis2: 0,
      pieData: [],
      lineData: {}
  };
  const months = {"JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6, "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12}
  console.log(vacuna)
  data.forEach(function(element) {  
    dia = parseInt(element.FECHA_ADMINISTRACION.substr(0,2), 10)

    mes = months[element.FECHA_ADMINISTRACION.substr(2,3)]

    ano = parseInt(element.FECHA_ADMINISTRACION.substr(5,4), 10)
    element.fecha = new Date(ano, mes, dia)
    if ((element.fecha >= desde) && (element.fecha <= hasta) && (vacuna == "" || element.VACUNA == vacuna)) {
      output.data.push(element)  
      output.dosis1 += parseInt(element.DOSIS_1)
      output.dosis2 += parseInt(element.DOSIS_2)
      if (yyyymm(element.fecha) in output.lineData) {
        output.lineData[yyyymm(element.fecha)] += parseInt(element.DOSIS_1) + parseInt(element.DOSIS_2)
      }else {
        output.lineData[yyyymm(element.fecha)] = parseInt(element.DOSIS_1) + parseInt(element.DOSIS_2)
      }
    }
  });
  sortObjectByKeys(output.lineData)
  output.pieData = [
    {
      name: "(" + ((output.dosis2/output.dosis1)*100).toFixed(1) + "%) Dos Dosis ",
      percentage: output.dosis2,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "(" + (((output.dosis1 - output.dosis2)/output.dosis1)*100).toFixed(1) + "%) Una Dosis" ,
      percentage: output.dosis1 -output.dosis2,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return output
}
/*
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
*/

export const Dashboard = () => {
  const [desde, setDesde] = useState(new Date(2020,12,1));
  const [hasta, setHasta] = useState(new Date());
  const [openDesde, setOpenDesde] = useState(false);
  const [openHasta, setOpenHasta] = useState(false);
  const [vacuna, setVacuna] = useState("");
  const [vacunaOpen, setVacunaOpen] = useState(false);
  const [vacunacionData, setVacunacionData] = React.useState([]);
  const [gotData, setGotData] = React.useState(false)
  const [chartsData, setChartsData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(URL)
      .then(function (response) {
        //console.log(response.data)
        setVacunacionData(response.data);
        setChartsData(filterData(response.data, desde, hasta, vacuna));        
        setGotData(true);       
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  }, []);

  function handlePickChangeValue(value) {
    setVacuna(value)
    setChartsData(filterData(vacunacionData, desde, hasta, value));
  }

  if (!gotData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Desde" onPress={() => setOpenDesde(true)} />
        <Button title="Hasta" onPress={() => setOpenHasta(true)} />
        <Button title="Vacuna" onPress={() => setVacunaOpen(!vacunaOpen)} />
      </View>
      <View style={[vacunaOpen ? null : styles.cerrado]}>
        <Picker
          selectedValue={vacuna}
          onValueChange={(itemValue, itemIndex) => handlePickChangeValue(itemValue)}
        >
          <Picker.Item label="Sputnik" value="Sputnik" />
          <Picker.Item label="AstraZeneca" value="AstraZeneca" />
          <Picker.Item label="Moderna" value="Moderna" />
          <Picker.Item label="Sinopharm" value="Sinopharm" />
        </Picker>
      </View>

      <DatePicker
        modal
        open={openDesde}
        date={desde}
        onConfirm={(date) => {
          setOpenDesde(false);
          setDesde(date);
          setChartsData(filterData(vacunacionData, date, hasta, vacuna));
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
          setChartsData(filterData(vacunacionData, desde, date, vacuna));
        }}
        onCancel={() => {
          setOpenHasta(false);
        }}
      />

      <PieChart
        data={chartsData.pieData}
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
        accessor={"percentage"}
        backgroundColor={"transparent"}
        paddingLeft={"40"}
        center={[10, 25]}
        absolute
      />
      <LineChart
        data={{
          labels: Object.keys(chartsData.lineData),
          datasets: [
            {
              data: Object.values(chartsData.lineData),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
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
    </ScrollView>
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
