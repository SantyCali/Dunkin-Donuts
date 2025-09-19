// src/screens/places/PlacesScreen.jsx
import React from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { useSelector, useDispatch } from "react-redux";
import { removePlace } from "../../store/slices/placesSlice";

const PlacesScreen = () => {
  const dispatch = useDispatch();
  const places = useSelector((s) => s.placesReducer?.places ?? []);

  const data = places.map((p) => ({
    id: String(p.id),
    title: p.title || "Mi lugar",
    address: p.address || "",
    thumb: p.photo || null,
    coords: p.coords || null,
  }));

  const confirmDelete = (id) => {
    Alert.alert(
      "Eliminar ubicación",
      "¿Querés borrar esta ubicación?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => dispatch(removePlace(id)) },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 140 }}
        ListEmptyComponent={
          <View style={{ padding: 24 }}>
            <Text style={{ textAlign: "center", fontWeight: "700", color: "#666" }}>
              Aún no hay ubicaciones guardadas
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.addr} numberOfLines={1}>{item.address || "—"}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.avatarWrap}>
                {item.thumb ? (
                  <Image source={{ uri: item.thumb }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, { alignItems: "center", justifyContent: "center" }]}>
                    <Feather name="image" size={22} color="#888" />
                  </View>
                )}
              </View>

              <View style={styles.mapWrap}>
                <MapView
                  pointerEvents="none"
                  style={styles.map}
                  initialRegion={{
                    latitude: item.coords?.latitude ?? -34.6,
                    longitude: item.coords?.longitude ?? -58.4,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  {item.coords && <Marker coordinate={item.coords} />}
                </MapView>
              </View>
            </View>

            <Pressable style={styles.trash} onPress={() => confirmDelete(item.id)} hitSlop={8}>
              <Feather name="trash-2" size={18} color="#fff" />
            </Pressable>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f2efed" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 6 },
  addr: { fontWeight: "800", color: "#111", flex: 1, marginRight: 8 },
  title: { fontWeight: "800", color: colors.orange },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarWrap: { width: 64, height: 64, borderRadius: 32, overflow: "hidden", backgroundColor: "#eee" },
  avatar: { width: "100%", height: "100%" },
  mapWrap: { flex: 1, height: 120, borderRadius: 12, overflow: "hidden" },
  map: { flex: 1 },
  trash: {
    position: "absolute",
    right: 14,
    bottom: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e63946",
    alignItems: "center",
    justifyContent: "center",
  },
});
