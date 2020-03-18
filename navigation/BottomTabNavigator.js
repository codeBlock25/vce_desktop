import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import HistorScreen from "../screens/historyScreen";
import Questionier from "../screens/questionier";
import AccountScreen from "../screens/accountScreen";
import HomeScreen from "../screens/HomeScreen";
import { Text } from "react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerShown: false
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={26}
              style={{ marginBottom: -3 }}
              color={focused ? "#0b3ae6" : "#9d9d9d"}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistorScreen}
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              size={26}
              style={{ marginBottom: -3 }}
              color={focused ? "#0b3ae6" : "#9d9d9d"}
              name="history"
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={26}
              style={{ marginBottom: -3 }}
              color={focused ? "#0b3ae6" : "#9d9d9d"}
              name="md-person"
            />
          )
        }}
      />

      <BottomTab.Screen
        name="questionier"
        component={Questionier}
        options={{
          tabBarOptions: false,
          tabBarButton: () => {
            return null;
          }
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "History":
      return "History";
  }
}
