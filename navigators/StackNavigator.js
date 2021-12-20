import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import Cart from "../screens/Cart";
import CurrentLocation from "../screens/MapView";
import CameraScreen from "../screens/CameraScreen";
import CameraPreview from "../screens/CameraPreview";


const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Products">
    <Stack.Screen name="Products" component={Products} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="MapView" component={CurrentLocation} />
    <Stack.Screen name="Camera" component={CameraScreen} />
  </Stack.Navigator>
);

export default StackNavigator;
