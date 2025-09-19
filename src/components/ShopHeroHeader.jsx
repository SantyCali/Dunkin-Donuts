import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const HERO = { uri:'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop' };

const ShopHeroHeader = ({ title = "Dunkin Donuts", subtitle = "Home", children }) => {
  return (
    <View style={styles.wrap}>
      <ImageBackground source={HERO} style={styles.hero} imageStyle={styles.heroImg}>
        <View style={styles.overlay} />
        <View style={styles.brand}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.bottomCurve}>
          <View style={styles.curveLeft} />
          <View style={styles.curveRight} />
        </View>
      </ImageBackground>

      <View style={styles.slot}>{children}</View>
    </View>
  );
};

export default ShopHeroHeader;

const styles = StyleSheet.create({
  wrap: { width:'100%', marginBottom: 12 },
  hero: { width:'100%', height: 180, justifyContent:'flex-end' },
  heroImg: { },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.35)' },
  brand: { alignItems:'center', paddingBottom: 12 },
  title: { color:'#fff', fontWeight:'800', fontSize:18, letterSpacing:0.5 },
  subtitle: { color:'#ffe', opacity:0.9, marginTop:2 },
  bottomCurve: { position:'absolute', bottom:-1, left:0, right:0, height:24, flexDirection:'row', justifyContent:'space-between' },
  curveLeft:  { width:28, height:28, backgroundColor:'#fff', borderTopRightRadius:28, transform:[{ translateX:-14 }] },
  curveRight: { width:28, height:28, backgroundColor:'#fff', borderTopLeftRadius:28, transform:[{ translateX:14 }] },
  slot: { position:'absolute', left:16, right:16, bottom:-22 },
});
