import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileStackNavigator from "./ProfileStackNavigator";
import DrawerMenuContent from "../drawer/DrawerMenuContent";

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
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
      <Drawer.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}
