// src/navigation/drawer/AppDrawerNavigator.jsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabsNavigator from "../tabs/TabsNavigator";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";
import { clearSession } from "../../db";

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    await clearSession();
    dispatch(clearUser());
    navigation.closeDrawer();
  };

  return (
    <View style={styles.drawer}>
      <Text style={styles.drawerTitle}>Menú</Text>
      <Pressable onPress={() => navigation.closeDrawer()} style={styles.item}>
        <Text style={styles.itemText}>Inicio</Text>
      </Pressable>
      <Pressable onPress={onLogout} style={[styles.item, styles.logout]}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
};

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    id="RootDrawer"
    screenOptions={{
      headerShown: false,
      drawerPosition: "right",     // 👈 abre desde la derecha
      drawerType: "front",
      swipeEnabled: true,
      swipeEdgeWidth: 80,
      overlayColor: "rgba(0,0,0,0.25)",
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="Tabs" component={TabsNavigator} />
  </Drawer.Navigator>
);

export default AppDrawerNavigator;

const styles = StyleSheet.create({
  drawer: { flex: 1, paddingTop: 48, paddingHorizontal: 16 },
  drawerTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  item: { paddingVertical: 12 },
  itemText: { fontSize: 16 },
  logout: { marginTop: 24, backgroundColor: colors.orange, borderRadius: 10, paddingHorizontal: 12 },
  logoutText: { color: "white", fontWeight: "700", paddingVertical: 10, fontSize: 16 },
});
