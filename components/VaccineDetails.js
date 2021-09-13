import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function VaccineDetails({ item }) {
  return (
    <View key={item._id} style={styles.listItem}>
      <View style={[styles.data]}>
        <Text style={{ fontWeight: "bold" }}>
          {"Num. Dosis 1: " + item.DOSIS_1}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Num. Dosis 2: " + item.DOSIS_2}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Fecha: " + item.FECHA_ADMINISTRACION}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{"Genero: " + item.DOSIS_1} </Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Tipo efector: " + item.TIPO_EFECTOR}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Grupo etario : " + item.GRUPO_ETARIO}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{"Vacuna: " + item.VACUNA} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  data: {
    flex: 1,
    margin: 5,
    flexDirection: "column",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  listItem: {
    margin: 5,
    padding: 5,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  changeStok: {
    height: 50,
    width: 70,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
