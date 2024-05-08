import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Sreach from "./Sreach";
import Profile from "./Profile";
import Cart from "./Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainPageNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => (<Image source={require("../Image/home.png")} style={{width: 25, height: 25}}/>)}}/>
        <Tab.Screen name="Cart" component={Cart} options={{tabBarIcon: () => (<Image source={require("../Image/sreach.png")} style={{width: 25, height: 25}}/>)}}/>
        <Tab.Screen name="Sreach" component={Sreach} options={{tabBarIcon: () => (<Image source={require("../Image/oder.png")} style={{width: 25, height: 25}}/>)}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => (<Image source={require("../Image/user.png")} style={{width: 25, height: 25}}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}