import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { Component } from 'react';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const COLLECTION_NAME = "vacunacion";
const APIKEY = "tdp2tp02021";
const URL = "https://tdp2server.herokuapp.com/vacunacion?key=" + APIKEY;

const group_by_month_and_field = (data, month, field) =>{
  let arr = [];
  data.forEach(element =>{
      if(element.FECHA_ADMINISTRACION.indexOf(month) >= 0){
       arr.push(element);
      }
  });
  let newData = new Map();
  arr.forEach(element => {
      const key = element[field];
      var collection = newData.get(key);
      if (!collection) {
           newData.set(key, {"DOSIS_1" : Number(element.DOSIS_1), "DOSIS_2" : Number(element.DOSIS_2)});
       } else {
           collection.DOSIS_1 = collection.DOSIS_1 + Number(element.DOSIS_1);
           collection.DOSIS_2 = collection.DOSIS_2 + Number(element.DOSIS_2);
       }
  });
  return newData;
}

export const Details = () => {
  const [vacunacionData, setVacunacionData] = React.useState([]);
  const [infoFiltrada, setInfoFiltrada] = React.useState([]);
  const [infoDisponible, setInfoDisponible] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(URL)
      .then(function (response) {
        setVacunacionData(response.data);
        setInfoFiltrada(group_by_month_and_field(vacunacionData, "AUG", "VACUNA"));
        setInfoDisponible(true);
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  }, []);
  return(
  <View style={styles.container}>
    <Text style={styles.tituloDetalle}>Detalles</Text>
    <ScrollView>
    <TableView>
      <Text style={styles.tituloMes}>Mes de Enero</Text>
      <Section header="Vacuna" headerTextColor="#007AFF" hideSeparator="true">
        <Cell cellStyle="RightDetail" title="Vacuna" detail="Sputnik" />
        <Cell cellStyle="RightDetail" title="Dosis 1" detail="5050" />
        <Cell cellStyle="RightDetail" title="Dosis 2" detail="12" />
        <Section/>
        <Cell cellStyle="RightDetail" title="Vacuna" detail="Astrazeneca" />
        <Cell cellStyle="RightDetail" title="Dosis 1" detail="650" />
        <Cell cellStyle="RightDetail" title="Dosis 2" detail="12" />
      </Section>
      <Section header="Grupo Etario" headerTextColor="#007AFF" hideSeparator="true">
        <Cell cellStyle="RightDetail" title="Grupo Etario" detail="41 a 50" />
        <Cell cellStyle="RightDetail" title="Dosis 1" detail="5050" />
        <Cell cellStyle="RightDetail" title="Dosis 2" detail="12" />
      <Section/>
        <Cell cellStyle="RightDetail" title="Tipo Efector" detail="30 o menos" />
        <Cell cellStyle="RightDetail" title="Dosis 1" detail="5050" />
        <Cell cellStyle="RightDetail" title="Dosis 2" detail="12" />
      </Section>
      </TableView>
    </ScrollView>
    {console.log(infoFiltrada)}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tituloDetalle: {
    fontSize: 20,
    color: "#111",
    textAlign: "center",
    padding: 10,
    margin: 10,
  },
  tituloMes: {
    fontSize: 15,
    color: "#111",
    textAlign: "center",
  },
  stage: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
    flex: 1,
  },
});
