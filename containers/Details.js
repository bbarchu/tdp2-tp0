import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import VaccineDetails from "../components/VaccineDetails";

export const Details = ({ route, navigation }) => {
  const { data, otherParam } = route.params;

  React.useEffect(() => {
    console.log(data);
  }, [route]);

  const renderItem = useCallback(
    ({ item }) => <VaccineDetails item={item} />,
    [data]
  );

  const keyExtractor = useCallback((item) => item._id.toString(), [data]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles</Text>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 40,
  },
  title: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  noConnectionText: {
    alignSelf: "center",
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressText: {
    color: "red",
    fontSize: 25,
    alignSelf: "center",
  },
  progressBar: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
});
