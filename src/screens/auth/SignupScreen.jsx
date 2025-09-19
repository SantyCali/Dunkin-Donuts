// src/screens/auth/SignupScreen.jsx
import React, { useMemo, useState, useEffect } from 'react'
import {
  ActivityIndicator, Dimensions, ImageBackground, KeyboardAvoidingView, Platform,
  ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Pressable, Switch
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../global/colors'
import AuthTabs from '../../components/AuthTabs'
import { useSignupMutation } from '../../services/authApi'
import { useDispatch } from 'react-redux'
import { setUserEmail, setLocalId } from '../../store/slices/userSlice'
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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [remember, setRemember] = useState(false)

  const [signup, result] = useSignupMutation()
  const dispatch = useDispatch()

  const disabled = useMemo(
    () =>
      !email.trim() ||
      !pass.trim() ||
      !pass2.trim() ||
      pass !== pass2 ||
      pass.length < 6 ||
      result.isLoading,
    [email, pass, pass2, result.isLoading]
  )

  const onsubmit = () => {
    if (disabled) return
    signup({ email, password: pass, returnSecureToken: true })
  }

  useEffect(() => {
    if (result.status !== 'fulfilled' || !result.data) return
    const { email: emailResp, localId } = result.data
    dispatch(setUserEmail(emailResp ?? ''))
    dispatch(setLocalId(localId ?? ''))
    ;(async () => {
      try {
        if (remember) {
          await saveSession(localId, emailResp ?? email)
        } else {
          await clearSession()
        }
      } catch (e) {
        console.log('persistencia signup error:', e)
      }
    })()
  }, [result, dispatch, remember, email])

  const apiError =
    result.isError &&
    (result.error?.data?.error?.message ||
      result.error?.data?.message ||
      result.error?.error ||
      'No se pudo crear la cuenta.')

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
              active="signup"
              onSwitch={(to) => { if (to === 'login') navigation.navigate('Login') }}
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
                    value={pass}
                    onChangeText={setPass}
                    placeholder="Password (min 6)"
                    placeholderTextColor={colors.gray}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="next"
                  />
                  <TextInput
                    value={pass2}
                    onChangeText={setPass2}
                    placeholder="Confirm password"
                    placeholderTextColor={colors.gray}
                    secureTextEntry
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={onsubmit}
                  />
                  {pass !== pass2 && !!pass2 && (
                    <Text style={styles.helper}>Las contraseñas no coinciden</Text>
                  )}
                </View>

                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>Recordar sesión</Text>
                  <Switch
                    value={remember}
                    onValueChange={setRemember}
                    thumbColor={remember ? colors.orange : '#f4f3f4'}
                    trackColor={{ false: 'rgba(0,0,0,0.15)', true: 'rgba(243,107,29,0.4)' }}
                  />
                </View>

                {!!apiError && <Text style={styles.error}>{apiError}</Text>}
              </View>

              <View>
                <Pressable style={[styles.btn, disabled && styles.btnDisabled]} onPress={onsubmit}>
                  {result.isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.btnText}>Crear cuenta</Text>}
                </Pressable>

                <Pressable hitSlop={8} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.forgot}>¿Ya tenés cuenta? Iniciá sesión</Text>
                </Pressable>
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
  heroBrand: {
    color: colors.white,
    fontWeight: '800',
    fontSize: s.fontLg,
    letterSpacing: 1,
    padding: s.spaceLg,
  },

  card: {
    width: s.maxW,
    backgroundColor: '#FDEFE8',
    borderRadius: s.radiusLg,
    padding: s.spaceLg,
    marginTop: -18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  cardBody: { width: '100%', minHeight: 360, justifyContent: 'space-between' },

  welcome: { fontSize: s.fontLg, fontWeight: '700', color: '#2b2b2b', marginBottom: s.spaceMd },

  inputs: { gap: s.spaceSm, marginBottom: s.spaceMd },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.22)',
    paddingVertical: 12,
    color: '#222',
  },
  helper: { marginTop: 6, color: colors.lightred, fontWeight: '700' },

  switchRow: {
    marginTop: s.spaceSm, marginBottom: s.spaceMd,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  switchLabel: { color: '#2b2b2b', fontWeight: '700', fontSize: s.fontSm },

  error: { backgroundColor: colors.lightred, color: colors.white, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },

  btn: {
    width: '100%', backgroundColor: colors.orange, borderRadius: 26,
    paddingVertical: 12, alignItems: 'center', justifyContent: 'center', marginBottom: s.spaceSm
  },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },

  forgot: { textAlign: 'center', color: '#2b2b2b', fontWeight: '700' },
})
