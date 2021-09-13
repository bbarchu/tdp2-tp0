import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import { DateSelector } from "../components/DatesSelectors";
import { CustomPieChart } from "../components/CustomPieChar";
import { CustomLineChart } from "../components/CustomLineChart";

const COLLECTION_NAME = "vacunacion";
const APIKEY = "tdp2tp02021";
const URL = "https://tdp2server.herokuapp.com/vacunacion?key=" + APIKEY;

export const Dashboard = (props) => {
  const [vacuna, setVacuna] = useState("");
  const [vacunaOpen, setVacunaOpen] = useState(false);
  const [vacunacionDataPie, setVacunacionDataPie] = React.useState([]);
  const [lineLabels, setlineLabels] = React.useState(["1", "2"]);
  const [vacunacionDataLine, setVacunacionDataLine] = React.useState([1, 2]);
  const [dateFrom, setDateFrom] = useState(new Date(2021, 0, 1));
  const [dateTo, setDateTo] = useState(new Date(2021, 0, 15));
  const [allData, setAlldata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      //console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (!state.isConnected) {
        alert("No hay conexión!");
      } else {
        NetInfo.addEventListener(handleFirstConnectivityChange);
        console.log("fetching data");
        axios
          .get(URL)
          .then(function (response) {
            console.log(response.data);
            //console.log(formatVacunationData(response.data));
            setAlldata(response.data);
          })
          .catch((e) => {
            console.log("Error:", e);
          });
      }
    });
  }, []);

  React.useEffect(() => {
    const filtered = filterData(allData, dateFrom, dateTo);
    console.log("filtered data", filtered);
    setFilteredData(filtered);
  }, [allData, dateFrom, dateTo]);
  React.useEffect(() => {
    console.log("updating vaccine");
    let filtered = filterData(allData, dateFrom, dateTo);
    if (vacuna != "") {
      filtered = filtered.filter((value) => value.VACUNA == vacuna);
      console.log("filtered data", filtered);
      setFilteredData((data) => filtered);
    }
  }, [vacuna]);
  React.useEffect(() => {
    console.log("updating vaccine!!!!");
    const lineFormat = formatVacunationDataLine(filteredData);
    setVacunacionDataLine(lineFormat.data);
    setlineLabels(lineFormat.labels);

    setVacunacionDataPie(formatVacunationData(filteredData));
  }, [filteredData]);

  /* formato 22FEB2021 */
  const handleFirstConnectivityChange = (connectionInfo) => {
    if (!connectionInfo.isConnected) alert("Se perdio la conexion!!");
  };
  const getMonthNumber = (mes) => {
    switch (mes) {
      case "JAN":
        return 0;
      case "FEB":
        return 1;
      case "MAR":
        return 2;
      case "APR":
        return 3;
      case "MAY":
        return 4;
      case "JUN":
        return 5;
      case "JUL":
        return 6;
      case "AUG":
        return 7;
      case "SEP":
        return 8;
      case "OCt":
        return 9;
      case "NOV":
        return 10;
      case "DIC":
        return 11;
    }
  };
  const isBetween = (date, min, max) =>
    date.getTime() >= min.getTime() && date.getTime() <= max.getTime();
  const getDateFromString = (dateString) => {
    const dia = dateString.substring(0, 2);
    const mes = getMonthNumber(dateString.substring(2, 5));
    const anio = dateString.substring(5);
    return new Date(anio, mes, dia);
  };
  const filterData = (data, fromDate, toDate) => {
    const filteredData = [];
    for (let value of data) {
      const date = getDateFromString(value.FECHA_ADMINISTRACION.split(":")[0]);
      if (isBetween(date, fromDate, toDate)) {
        filteredData.push(value);
      }
    }
    return filteredData;
  };

  const formatVacunationData = (vacunacionArray) => {
    let cantDosis1 = 0;
    let cantDosis2 = 0;
    for (let vacunacion of vacunacionArray) {
      if (vacunacion.DOSIS_1) {
        cantDosis1 += parseInt(vacunacion.DOSIS_1, 10);
      }
      if (vacunacion.DOSIS_2) {
        cantDosis2 += parseInt(vacunacion.DOSIS_2, 10);
      }
    }
    const formatData = [
      {
        name: "Dosis 1",
        total: cantDosis1,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10,
      },
      {
        name: "Dosis 2",
        total: cantDosis2,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 10,
      },
    ];
    return formatData;
  };

  const formatVacunationDataLine = (vacunacionArray) => {
    const data = [];

    const datesSet = new Set();
    for (let vacunacion of vacunacionArray) {
      datesSet.add(
        vacunacion.FECHA_ADMINISTRACION.split(":")[0].substring(0, 5)
      );
    }
    let cantDosis;
    for (let date of datesSet) {
      const filtedData = vacunacionArray.filter(
        (value) =>
          value.FECHA_ADMINISTRACION.split(":")[0].substring(0, 5) == date
      );
      for (let vacunacion of filtedData) {
        cantDosis = 0;
        if (vacunacion.DOSIS_1) {
          cantDosis += parseInt(vacunacion.DOSIS_1, 10);
        }
        if (vacunacion.DOSIS_2) {
          cantDosis += parseInt(vacunacion.DOSIS_2, 10);
        }
      }
      data.push(cantDosis);
    }

    const formatData = {
      labels: [...datesSet],

      data: [...data],
    };
    //console.log("values", labels);
    return formatData;
  };
  const handleDateFrom = (newDate) => {
    setDateFrom(newDate);
  };
  const handleDateTo = (newDate) => {
    setDateTo(newDate);
  };
  const goDetails = () => {
    props.navigation.navigate("Detalles", { data: filteredData });
  };
  return (
    <View style={styles.container}>
      <DateSelector
        dateFrom={dateFrom}
        setDateFrom={handleDateFrom}
        dateTo={dateTo}
        setDateTo={handleDateTo}
        maxDaysInterval={30}
      />

      <View>
        <Picker
          selectedValue={vacuna}
          onValueChange={(itemValue, itemIndex) => setVacuna(itemValue)}
          style={styles.picker}
          mode={"dropdown"}
          dropdownIconColor={"blue"}
          itemStyle={{ color: "blue", textAlign: "center" }}
        >
          <Picker.Item label="Sputnik" value="Sputnik" />
          <Picker.Item label="AstraZeneca" value="AstraZeneca" />
          <Picker.Item label="Sinopharm" value="Sinopharm" />
          <Picker.Item label="AstraZeneca" value="AstraZeneca" />
          <Picker.Item label="Todas las vacunas" value="" />
        </Picker>
      </View>

      <CustomPieChart data={vacunacionDataPie} accessor={"total"} />
      <CustomLineChart
        lineLabels={lineLabels}
        vacunacionDataLine={vacunacionDataLine}
      />

      <Button title="Detalles" onPress={goDetails} />
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
  picker: {
    height: 20,
    color: "blue",
    width: 200,
    marginLeft: 110,
    marginBottom: 30,
    fontSize: 22,
    borderColor: "blue",
    borderWidth: 10,
  },
});
