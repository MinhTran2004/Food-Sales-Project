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
import CheckOder from "./CheckOder";
import Favourite from "./Favourite";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OderActive from "./OderActive";
import OderCompleted from "./OderCompleted";
import OderCancelled from "./OderCancelled";
import Contact from "./Contact";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";

const Stack = createNativeStackNavigator();

export default function MainPageNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="CheckOder" component={CheckOder} options={{ headerShown: false }} />
        <Stack.Screen name="Favourite" component={Favourite} options={{ headerShown: false }} />
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <BottomTab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'black', opacity: 0.5 } }}>
      <BottomTab.Screen name="Home" component={Home} options={{ tabBarIcon: () => (<Image source={require("../Image/home.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />) }} />
      <BottomTab.Screen name="Sreach" component={Sreach} options={{ tabBarIcon: () => (<Image source={require("../Image/sreach.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />) }} />
      <BottomTab.Screen name="Oder" component={TopTabs} options={{ tabBarIcon: () => (<Image source={require("../Image/oder.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />) }} />
      <BottomTab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => (<Image source={require("../Image/user.png")} style={{ width: 25, height: 25, tintColor: 'white' }} />) }} />
    </BottomTab.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();
function TopTabs() {
  return (
    <TopTab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: '#181a20' } }}>
      <TopTab.Screen name="Active" component={OderActive} options={{ tabBarLabelStyle: { color: '#606161' } }} />
      <TopTab.Screen name="Completed" component={OderCompleted} options={{ tabBarLabelStyle: { color: '#606161' } }} />
      <TopTab.Screen name="Cancelled" component={OderCancelled} options={{ tabBarLabelStyle: { color: '#606161' } }} />
    </TopTab.Navigator>
  );
}
