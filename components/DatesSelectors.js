import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export const DateSelector = ({
  dateTo,
  dateFrom,
  setDateFrom,
  setDateTo,
  maxDaysInterval,
}) => {
  const [showTo, setShowTo] = useState(false);
  const [showFrom, setShowFrom] = useState(false);

  const changeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || dateFrom;
    //if (checkInterval(currentDate, dateTo)) {
    setDateFrom(currentDate);
    //}
    setShowFrom(false);
  };
  const changeTo = (event, selectedDate) => {
    const currentDate = selectedDate || dateTo;
    //if (checkInterval(dateFrom, currentDate)) {
    setDateTo(currentDate);
    //}

    setShowTo(false);
  };

  const selectFrom = () => {
    setShowTo(false);
    setShowFrom(true);
  };
  const selectTo = () => {
    setShowTo(true);
    setShowFrom(false);
  };

  const checkInterval = (fromDate, toDate) => {
    var Difference_In_Time = toDate.getTime() - fromDate.getTime();
    if (Difference_In_Time < 0) {
      alert("La fecha hasta tiene que ser mayor que la desde");
      return false;
    }
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > maxDaysInterval) {
      alert(
        "El inertavalo entre fechas no puede ser mayor a " +
          maxDaysInterval +
          " dias"
      );
      return false;
    } else {
      return true;
    }
  };
  const formatDate = (date) => {
    if (date) {
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    }
  };
  return (
    <View style={styles.row}>
      <View style={styles.date}>
        <TouchableOpacity onPress={selectFrom}>
          <Text style={styles.dateText}>{"Desde " + formatDate(dateFrom)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.date}>
        <TouchableOpacity onPress={selectTo}>
          <Text style={styles.dateText}> {"Hasta " + formatDate(dateTo)}</Text>
        </TouchableOpacity>
      </View>
      <View>
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateFrom}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={changeFrom}
          />
        )}
      </View>
      <View>
        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTo}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={changeTo}
          />
        )}
      </View>
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
  date: {
    borderColor: "black",
    borderBottomWidth: 2,
    margin: 5,
    backgroundColor: "skyblue",
  },
  dateText: {
    color: "black",
    fontSize: 18,
  },
  cerrado: {
    display: "none",
  },
});
