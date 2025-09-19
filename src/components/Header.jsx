// src/components/Header.jsx
import React from 'react'
import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../global/colors'

const DEFAULT_BG =
  'https://enriqueortegaburgos.com/wp-content/uploads/2022/10/dunkin-7.jpg'

const Header = ({
  title = "Dunkin' Donuts",
  subtitle = '',
  navigation,
  canGoBack,
  bgUri = DEFAULT_BG,
  height = 140,
}) => {
  const openDrawer = () => navigation?.getParent?.()?.openDrawer?.()

  return (
    <View style={[styles.wrap, { height }]}>
      <ImageBackground source={{ uri: bgUri }} style={styles.bg} imageStyle={styles.bgImg}>
        <View style={styles.tint} />
        <SafeAreaView edges={['top']} style={styles.safe}>
          <View style={styles.bar}>
            {/* Botón atrás 👉 aparece si hay historial */}
            {navigation?.canGoBack() ? (
              <Pressable
                hitSlop={10}
                onPress={() => navigation.goBack()}
                style={styles.iconBtn}
              >
                <View style={styles.iconBg}>
                  <Feather name="arrow-left" size={20} color="#fff" />
                </View>
              </Pressable>
            ) : (
              <View style={styles.iconBtn} />
            )}

            <View style={styles.center}>
              <Text numberOfLines={1} style={styles.brand}>
                {title}
              </Text>
              {!!subtitle && (
                <View style={styles.pill}>
                  <Text numberOfLines={1} style={styles.pillText}>
                    {subtitle}
                  </Text>
                </View>
              )}
            </View>

            {/* Menú hamburguesa */}
            <Pressable hitSlop={10} onPress={openDrawer} style={styles.iconBtn}>
              <View style={styles.iconBg}>
                <Feather name="menu" size={20} color="#fff" />
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.orange,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  bg: { flex: 1, justifyContent: 'flex-end' },
  bgImg: { resizeMode: 'cover' },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.orange,
    opacity: 0.72,
  },
  safe: { paddingBottom: 12, paddingHorizontal: 14 },
  bar: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 42, alignItems: 'center', justifyContent: 'center' },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  center: { flex: 1, alignItems: 'center', gap: 6 },
  brand: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    fontFamily: 'Pacifico-Regular',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  pillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
})
