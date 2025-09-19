// src/screens/profile/ProfileScreen.jsx
import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator, ImageBackground, ScrollView } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { usePutProfilePictureMutation } from '../../services/profileApi'
import { setImage } from '../../store/slices/userSlice'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { Feather } from '@expo/vector-icons'

const HERO =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop'

const AVATAR = 128

const ProfileScreen = () => {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState('')
  const [locationLoaded, setLocationLoaded] = useState(false)

  const user = useSelector(s => s.userReducer.email)
  const localId = useSelector(s => s.userReducer.localId)
  const image = useSelector(s => s.userReducer.image)

  const [triggerPutProfilePicture] = usePutProfilePictureMutation()
  const dispatch = useDispatch()

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    })
    if (!result.canceled) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
      dispatch(setImage(imgBase64))
      triggerPutProfilePicture({ localId, image: imgBase64 })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') return
        const loc = await Location.getCurrentPositionAsync({})
        setLocation(loc)
        const resp = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
        )
        const data = await resp.json()
        setAddress(data.results?.[0]?.formatted_address ?? '')
      } finally {
        setLocationLoaded(true)
      }
    })()
  }, [])

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <ImageBackground source={{ uri: HERO }} style={styles.hero} imageStyle={styles.heroImg}>
        <View style={styles.heroTint} />
        <Text style={styles.brand}>Dunkin Donuts</Text>

        {/* Avatar + email */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            {image ? (
              <Image source={{ uri: image }} resizeMode="cover" style={styles.profileImage} />
            ) : (
              <Text style={styles.textProfilePlaceHolder}>{user?.charAt(0)?.toUpperCase()}</Text>
            )}
            <Pressable onPress={pickImage} style={styles.fab}>
              <CameraIcon />
            </Pressable>
          </View>

          <View style={styles.emailPill}>
            <Text numberOfLines={1} style={styles.emailText}>{user}</Text>
          </View>
        </View>
      </ImageBackground>

      {/* CARD Ubicacion */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="map-pin" size={18} color={colors.orange} />
            <Text style={styles.rowLabel}>Dirección</Text>
          </View>
          <Text numberOfLines={2} style={styles.rowValue}>{address || '—'}</Text>
        </View>

        <View style={styles.mapBox}>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Dunkin Donuts"
              />
            </MapView>
          ) : locationLoaded ? (
            <View style={styles.mapFallback}>
              <Feather name="alert-triangle" size={18} color="#b00020" />
              <Text style={styles.mapFallbackText}>No se pudo obtener la ubicación</Text>
            </View>
          ) : (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff5ef' },
  scrollContent: {
    paddingBottom: 140,
  },

  hero: {
    height: 280,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 142,
  },
  heroImg: { resizeMode: 'cover' },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.orange, opacity: 0.42 },
  brand: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    fontFamily: 'Pacifico-Regular',
  },

  avatarWrap: {
    position: 'absolute',
    bottom: -AVATAR / 2 - 16,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarCircle: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  textProfilePlaceHolder: { color: colors.white, fontSize: 48 },
  profileImage: { width: AVATAR - 8, height: AVATAR - 8, borderRadius: (AVATAR - 8) / 2 },

  fab: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },

  emailPill: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    maxWidth: 280,
  },
  emailText: { color: '#2b2b2b', fontWeight: '700' },

  card: {
    marginTop: AVATAR / 2 + 28,
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowLabel: { fontWeight: '800', color: '#333' },
  rowValue: { flex: 1, textAlign: 'right', color: '#444', fontWeight: '600' },

  mapBox: {
    height: 240,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f4f1ef',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  map: { flex: 1 },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mapFallback: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  mapFallbackText: { color: '#b00020', fontWeight: '700' },
})
