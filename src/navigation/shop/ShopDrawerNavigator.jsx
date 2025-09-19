import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShopStackNavigator from "./ShopStackNavigator";
import DrawerMenuContent from "../drawer/DrawerMenuContent";

const Drawer = createDrawerNavigator();

export default function ShopDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.25)",
        swipeEnabled: true,
      }}
      drawerContent={(props) => <DrawerMenuContent {...props} />}
    >
      <Drawer.Screen name="ShopStack" component={ShopStackNavigator} />
    </Drawer.Navigator>
  );
}
