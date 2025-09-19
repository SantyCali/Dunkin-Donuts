// src/screens/places/AddPlaceScreen.jsx
import React, { useMemo, useState } from "react";
import {
  StyleSheet, View, Text, Pressable, Image, ActivityIndicator, ScrollView, Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../../store/slices/placesSlice";

const DEFAULT_REGION = {
  latitude: -34.6037,
  longitude: -58.3816,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const AddPlaceScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [coords, setCoords] = useState(null);
  const [getting, setGetting] = useState(false);
  const dispatch = useDispatch();

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      Alert.alert("Permiso requerido", "Necesitamos acceso a tu galería para elegir una foto.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!res.canceled && res.assets?.[0]?.uri) setPhoto(res.assets[0].uri);
  };

  const centerRegion = useMemo(() => {
    if (coords) return { ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 };
    return DEFAULT_REGION;
  }, [coords]);

  const pickLocation = async () => {
    try {
      setGetting(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Activá el permiso de ubicación para continuar.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    } finally {
      setGetting(false);
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate || {};
    if (latitude && longitude) setCoords({ latitude, longitude });
  };

  const onSave = () => {
    if (!photo || !coords) {
      Alert.alert("Faltan datos", "Elegí una imagen y una ubicación antes de guardar.");
      return;
    }
    dispatch(addPlace({ photo, coords, title: "Nuevo lugar", address: "" }));
    Alert.alert("Guardado", "Tu lugar fue agregado.");
    setPhoto(null);
    setCoords(null);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16, gap: 18, paddingBottom: 24 }}>
      <Text style={styles.h1}>Agregá un lugar:</Text>

      {/* Imagen */}
      <View style={styles.block}>
        <View style={styles.iconBox}>
          {photo ? (
            <Image source={{ uri: photo }} style={{ width: "100%", height: "100%" }} />
          ) : (
            <Feather name="image" size={64} color="#222" />
          )}
        </View>
        <Pressable style={styles.btn} onPress={pickImage}>
          <Text style={styles.btnText}>Seleccionar imagen</Text>
        </Pressable>
      </View>

      {/* Ubicación */}
      <View style={styles.block}>
        <View style={[styles.mapBox]}>
          {!coords && !getting && (
            <View style={styles.hint}>
              <Feather name="map-pin" size={16} color="#222" />
              <Text style={styles.hintText}>Tocá el mapa para colocar el pin</Text>
            </View>
          )}

          {getting ? (
            <View style={styles.center}><ActivityIndicator /></View>
          ) : (
            <MapView
              style={{ flex: 1 }}
              initialRegion={centerRegion}
              onPress={handleMapPress}
            >
              {coords && <Marker coordinate={coords} />}
            </MapView>
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={[styles.btn, { flex: 1 }]} onPress={pickLocation}>
            <Text style={styles.btnText}>Usar mi ubicación</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.savePointBtn, { flex: 1, opacity: coords ? 1 : 0.5 }]}
            disabled={!coords}
            onPress={() => Alert.alert("Ubicación fijada", "Se usará el punto marcado.")}
          >
            <Text style={styles.savePointText}>Usar este punto</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 8 }}>
        <Text style={{ color: "#777", marginBottom: 8 }}>¿Todo listo?</Text>
        <Pressable style={[styles.btn, styles.saveBtn]} onPress={onSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff5ef" },
  h1: { fontSize: 20, fontWeight: "900", color: "#222", marginLeft: 4 },
  block: { alignItems: "center", gap: 12 },
  iconBox: {
    width: 180, height: 130, borderWidth: 2, borderColor: "#ffd9c7",
    borderStyle: "dashed", borderRadius: 16, alignItems: "center",
    justifyContent: "center", backgroundColor: "#fff",
  },
  mapBox: {
    width: 280, height: 200, borderWidth: 2, borderColor: "#ffd9c7",
    borderStyle: "dashed", borderRadius: 16, overflow: "hidden", backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: colors.orange, paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 24, alignItems: "center", justifyContent: "center", minWidth: 200,
  },
  btnText: { color: "#fff", fontWeight: "800" },
  savePointBtn: { backgroundColor: "#222" },
  savePointText: { color: "#fff", fontWeight: "800" },
  saveBtn: { backgroundColor: "#222", minWidth: 160 },
  saveText: { color: "#fff", fontWeight: "800" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  hint: {
    position: "absolute", top: 8, left: 8, zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 6, flexDirection: "row", alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: "rgba(0,0,0,0.06)",
  },
  hintText: { color: "#222", fontWeight: "700", fontSize: 12 },
});
