import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "./containers/Dashboard";
import { Details } from "./containers/Details";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const RootComponent = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plan de vacunación COVID-19"
          component={Dashboard}
        />
        <Stack.Screen name="Detalles" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <RootComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
