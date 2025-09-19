// src/screens/auth/AuthScreen.jsx
import React, { useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator, Animated, Dimensions, ImageBackground, KeyboardAvoidingView,
  Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../global/colors'
import AuthTabs from '../../components/AuthTabs'

const { width } = Dimensions.get('window')
const L = {
  maxW: Math.min(width - 24, 460),
  heroH: Math.min(230, width * 0.62),
  rLg: 24, rXl: 36,
  sSm: 8, sMd: 12, sLg: 16, sXl: 20,
  fSm: 14, fMd: 16, fLg: 18
}
const HERO = { uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop' }

export default function AuthScreen() {
  const [tab, setTab] = useState('login')
  const anim = useRef(new Animated.Value(0)).current // 0=login, 1=signup

  const switchTo = (to) => {
    Animated.timing(anim, { toValue: to === 'signup' ? 1 : 0, duration: 220, useNativeDriver: true }).start()
    setTab(to)
  }

  const loginOpacity    = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })
  const signupOpacity   = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
  const loginTranslate  = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 10] })
  const signupTranslate = anim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] })

  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [pass2, setPass2] = useState('')
  const isLoading = false

  const loginDisabled  = useMemo(() => !email.trim() || !pass.trim() || isLoading, [email, pass, isLoading])
  const signupDisabled = useMemo(() => !email.trim() || !pass.trim() || !pass2.trim() || pass !== pass2 || isLoading, [email, pass, pass2, isLoading])

  const onLogin  = () => { if (!loginDisabled)  {/* triggerLogin */} }
  const onSignup = () => { if (!signupDisabled) {/* triggerSignup */} }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: L.sXl }} keyboardShouldPersistTaps="handled">

          {/* HERO */}
          <View style={{ width: '100%', alignItems: 'center', marginTop: L.sSm }}>
            <ImageBackground
              source={HERO}
              style={{ width: L.maxW, height: L.heroH, justifyContent: 'flex-end' }}
              imageStyle={{ borderTopLeftRadius: L.rLg, borderTopRightRadius: L.rLg, borderBottomLeftRadius: L.rXl, borderBottomRightRadius: L.rXl }}
            >
              <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.28)', borderTopLeftRadius: L.rLg, borderTopRightRadius: L.rLg, borderBottomLeftRadius: L.rXl, borderBottomRightRadius: L.rXl }} />
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: L.fLg, letterSpacing: 1, padding: L.sLg }}>Dunkin Donuts</Text>
            </ImageBackground>
          </View>

          {/* CARD */}
          <View style={{ width: L.maxW, backgroundColor: '#FDEFE8', borderRadius: L.rLg, padding: L.sLg, marginTop: -18, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' }}>
            <AuthTabs active={tab} onSwitch={switchTo} />

            <View style={{ width: '100%', minHeight: 360, justifyContent: 'space-between' }}>
              {/* TOP */}
              <View>
                <Text style={{ fontSize: L.fLg, fontWeight: '700', color: '#2b2b2b', marginBottom: L.sMd }}>
                  Bienvenido a Dunkin Donuts
                </Text>

                {/* LOGIN */}
                <Animated.View style={{ opacity: loginOpacity, transform: [{ translateY: loginTranslate }], position: 'absolute', left: 0, right: 0 }}>
                  <View style={{ gap: L.sSm, marginBottom: L.sMd }}>
                    <TextInput
                      placeholder="E-mail"
                      placeholderTextColor={colors.gray}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      returnKeyType="next"
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={colors.gray}
                      autoCapitalize="none"
                      secureTextEntry
                      style={styles.input}
                      value={pass}
                      onChangeText={setPass}
                      returnKeyType="done"
                      onSubmitEditing={onLogin}
                    />
                  </View>
                </Animated.View>

                {/* SIGNUP */}
                <Animated.View style={{ opacity: signupOpacity, transform: [{ translateY: signupTranslate }] }}>
                  <View style={{ gap: L.sSm, marginBottom: L.sMd }}>
                    <TextInput
                      placeholder="E-mail"
                      placeholderTextColor={colors.gray}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      returnKeyType="next"
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={colors.gray}
                      autoCapitalize="none"
                      secureTextEntry
                      style={styles.input}
                      value={pass}
                      onChangeText={setPass}
                      returnKeyType="next"
                    />
                    <TextInput
                      placeholder="Confirm password"
                      placeholderTextColor={colors.gray}
                      autoCapitalize="none"
                      secureTextEntry
                      style={styles.input}
                      value={pass2}
                      onChangeText={setPass2}
                      returnKeyType="done"
                      onSubmitEditing={onSignup}
                    />
                  </View>
                </Animated.View>
              </View>

              {/* BOTTOM */}
              <View>
                <Pressable
                  style={[styles.btn, (tab === 'login' ? loginDisabled : signupDisabled) && { opacity: 0.7 }]}
                  onPress={tab === 'login' ? onLogin : onSignup}
                >
                  {isLoading
                    ? <ActivityIndicator color={colors.white} />
                    : <Text style={styles.btnText}>{tab === 'login' ? 'Login' : 'Crear cuenta'}</Text>}
                </Pressable>

                {tab === 'login'
                  ? <Text style={styles.forgot}>¿Olvidaste la contraseña?</Text>
                  : <Text style={styles.forgot}>¿Ya tenés cuenta? Iniciá sesión</Text>}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.22)',
    paddingVertical: 12, color: '#222'
  },
  btn: {
    width: '100%', backgroundColor: colors.orange, borderRadius: 26,
    paddingVertical: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8
  },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  forgot: { textAlign: 'center', color: '#2b2b2b', fontWeight: '700' },
})
