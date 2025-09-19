// src/navigation/drawer/AppDrawerNavigator.jsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabsNavigator from "../tabs/TabsNavigator";
import PlacesStackNavigator from "../places/PlacesStackNavigator"; // 👈 stack con header/back
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";
import { clearSession } from "../../db";
import { Feather } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();

  const go = (name, params) => {
    navigation.navigate(name, params);
    navigation.closeDrawer();
  };

  const onLogout = async () => {
    await clearSession();
    dispatch(clearUser());
    navigation.closeDrawer();
  };

  return (
    <View style={styles.drawer}>
      <Text style={styles.drawerTitle}>Menú</Text>

      <Pressable onPress={() => go("Tabs")} style={styles.item}>
        <Feather name="home" size={18} color="#111" />
        <Text style={styles.itemText}>Inicio</Text>
      </Pressable>

      {/* 👇 accesos que empujan a screens dentro del PlacesStack */}
      <Pressable
        onPress={() => go("PlacesStack", { screen: "AddPlace" })}
        style={styles.item}
      >
        <Feather name="image" size={18} color="#111" />
        <Text style={styles.itemText}>Agregar ubicación</Text>
      </Pressable>

      <Pressable
        onPress={() => go("PlacesStack", { screen: "Places" })}
        style={styles.item}
      >
        <Feather name="map-pin" size={18} color="#111" />
        <Text style={styles.itemText}>Mis ubicaciones</Text>
      </Pressable>

      <Pressable onPress={onLogout} style={[styles.item, styles.logout]}>
        <Feather name="log-out" size={18} color="#fff" />
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
      drawerPosition: "right",  // 👉 abre desde la derecha
      drawerType: "front",
      swipeEnabled: true,
      swipeEdgeWidth: 80,
      overlayColor: "rgba(0,0,0,0.25)",
      drawerStyle: { width: 270 },
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="Tabs" component={TabsNavigator} />
    <Drawer.Screen name="PlacesStack" component={PlacesStackNavigator} />
  </Drawer.Navigator>
);

export default AppDrawerNavigator;

const styles = StyleSheet.create({
  drawer: { flex: 1, paddingTop: 48, paddingHorizontal: 16 },
  drawerTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  item: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: { fontSize: 16, color: "#111" },
  logout: {
    marginTop: 24,
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  logoutText: { color: "white", fontWeight: "700", paddingVertical: 10, fontSize: 16 },
});
