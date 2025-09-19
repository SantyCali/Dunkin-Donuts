// src/screens/auth/LoginScreen.jsx
import React, { useEffect, useMemo, useState } from 'react'
import {
  StyleSheet, Text, View, TextInput, Pressable, Dimensions, StatusBar,
  ImageBackground, Platform, KeyboardAvoidingView, ScrollView,
  ActivityIndicator, Switch
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../global/colors'
import { useLoginMutation } from '../../services/authApi'
import { useDispatch } from 'react-redux'
import { setUserEmail, setLocalId } from '../../store/slices/userSlice'
import AuthTabs from '../../components/AuthTabs'
import { saveSession, clearSession } from '../../db'

const { width } = Dimensions.get('window')
const LAYOUT = {
  maxW: Math.min(width - 24, 460),
  heroH: Math.min(230, width * 0.62),
  radiusLg: 24,
  radiusXl: 36,
  spaceXs: 4, spaceSm: 8, spaceMd: 12, spaceLg: 16, spaceXl: 20,
  fontSm: 14, fontMd: 16, fontLg: 18,
}
const s = LAYOUT
const HERO_IMAGE = { uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop' }

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [persistSession, setPersistSession] = useState(false)

  const [triggerLogin, result] = useLoginMutation()
  const dispatch = useDispatch()

  const disabled = useMemo(
    () => !email.trim() || !password.trim() || result.isLoading,
    [email, password, result.isLoading]
  )

  const onsubmit = () => {
    if (disabled) return
    triggerLogin({ email, password })
  }

  useEffect(() => {
    (async () => {
      if (result.status === 'fulfilled' && result.data) {
        const { localId, email: emailResp } = result.data
        try {
          if (persistSession) await saveSession(localId, emailResp)
          else await clearSession()
        } catch (e) {
          console.log('Error al guardar sesión:', e)
        } finally {
          dispatch(setUserEmail(emailResp))
          dispatch(setLocalId(localId))
        }
      }
    })()
  }, [result, persistSession, dispatch])

  const apiError =
    result.isError &&
    (result.error?.data?.error?.message ||
     result.error?.data?.message ||
     result.error?.error ||
     'Error al iniciar sesión. Probá de nuevo.')

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.heroWrap}>
            <ImageBackground source={HERO_IMAGE} style={styles.hero} imageStyle={styles.heroImg} resizeMode="cover">
              <View style={styles.heroOverlay} />
              <Text style={styles.heroBrand}>Dunkin Donuts</Text>
            </ImageBackground>
          </View>

          <View style={styles.card}>
            <AuthTabs
              active="login"
              onSwitch={(to) => { if (to === 'signup') navigation.navigate('Signup') }}
            />

            <View style={styles.cardBody}>
              <View>
                <Text style={styles.welcome}>Bienvenido a Dunkin Donuts</Text>

                <View style={styles.inputs}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                    placeholderTextColor={colors.gray}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="next"
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.gray}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={onsubmit}
                  />
                </View>

                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>¿Mantener sesión iniciada?</Text>
                  <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    thumbColor={persistSession ? colors.orange : '#f4f3f4'}
                    trackColor={{ false: 'rgba(0,0,0,0.15)', true: 'rgba(243,107,29,0.4)' }}
                  />
                </View>

                {!!apiError && <Text style={styles.error}>{apiError}</Text>}
              </View>

              <View>
                <Pressable style={[styles.btn, disabled && styles.btnDisabled]} onPress={onsubmit}>
                  {result.isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.btnText}>Iniciar sesión</Text>}
                </Pressable>

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                  <Text style={{ color: '#2b2b2b' }}>¿No tenés cuenta?</Text>
                  <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ color: colors.orange, textDecorationLine: 'underline', fontWeight: '700' }}>Crear una</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  scroll: { alignItems: 'center', paddingBottom: s.spaceXl },
  heroWrap: { width: '100%', alignItems: 'center', marginTop: s.spaceSm },
  hero: { width: s.maxW, height: s.heroH, justifyContent: 'flex-end' },
  heroImg: {
    borderTopLeftRadius: s.radiusLg,
    borderTopRightRadius: s.radiusLg,
    borderBottomLeftRadius: s.radiusXl,
    borderBottomRightRadius: s.radiusXl,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderTopLeftRadius: s.radiusLg,
    borderTopRightRadius: s.radiusLg,
    borderBottomLeftRadius: s.radiusXl,
    borderBottomRightRadius: s.radiusXl,
  },
  heroBrand: { color: colors.white, fontWeight: '800', fontSize: s.fontLg, letterSpacing: 1, padding: s.spaceLg },
  card: {
    width: s.maxW,
    backgroundColor: '#FDEFE8',
    borderRadius: s.radiusLg,
    padding: s.spaceLg,
    marginTop: -18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }, android: { elevation: 2 } }),
  },
  cardBody: { width: '100%', minHeight: 380, justifyContent: 'space-between' },
  welcome: { fontSize: s.fontLg, fontWeight: '700', color: '#2b2b2b', marginBottom: s.spaceMd },
  inputs: { gap: s.spaceSm, marginBottom: s.spaceSm },
  input: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.22)', paddingVertical: 12, color: '#222' },
  switchRow: {
    marginTop: s.spaceSm, marginBottom: s.spaceMd,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8
  },
  switchLabel: { color: '#2b2b2b', fontWeight: '700', fontSize: s.fontSm },
  error: { backgroundColor: colors.lightred, color: colors.white, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  btn: { width: '100%', backgroundColor: colors.orange, borderRadius: 26, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', marginBottom: s.spaceSm },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: s.fontMd },
})
