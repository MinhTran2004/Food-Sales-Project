import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Sreach from "./Sreach";
import Profile from "./Profile";
import Cart from "./Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Product from "./Product";
import Oder from "./Oder";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainPageNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => (<Image source={require("../Image/home.png")} style={{ width: 25, height: 25 }} />) }} />
      <Tab.Screen name="Sreach" component={Sreach} options={{ tabBarIcon: () => (<Image source={require("../Image/sreach.png")} style={{ width: 25, height: 25 }} />) }} />
      <Tab.Screen name="Oder" component={Oder} options={{ tabBarIcon: () => (<Image source={require("../Image/oder.png")} style={{ width: 25, height: 25 }} />) }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => (<Image source={require("../Image/user.png")} style={{ width: 25, height: 25 }} />) }} />
    </Tab.Navigator>
  );
}
