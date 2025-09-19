// src/screens/shop/ProductScreen.jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { colors } from '../../global/colors';
import { useSelector, useDispatch } from 'react-redux';
import { addItemTocart } from '../../store/slices/cartSlice';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const HERO_IMG = {
  uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop',
};

const ProductScreen = () => {
  const product = useSelector(state => state.shopReducer.productSelected);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (!product) return null;

  const handleAdd = () => {
    dispatch(addItemTocart({ product, quantity: 1 }));
    Toast.show({
      type: 'success',
      text1: '🛒 Añadido',
      text2: `${product.title} — tocar para ver el carrito`,
      onPress: () => {
        Toast.hide();               
        navigation.navigate('CartTab'); 
      },
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 28 }}>
      {/* HERO */}
      <View style={styles.heroBox}>
        <ImageBackground source={HERO_IMG} style={styles.hero} imageStyle={styles.heroImg}>
          <View style={styles.heroOverlay} />
        </ImageBackground>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.circleWrap}>
          <Image source={{ uri: product.mainImage }} style={styles.circleImg} resizeMode="cover" />
        </View>

        {!!product.brand && <Text style={styles.brand}>{product.brand}</Text>}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.longDescription}</Text>

        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}

        <Text style={styles.price}>Precio: ${product.price}</Text>

        <Pressable style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.95 }]} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2efed' },
  heroBox: { paddingBottom: 40, backgroundColor: 'transparent' },
  hero: { height: 140, justifyContent: 'flex-end' },
  heroImg: { borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#fffaf7',
    borderRadius: 20,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },
  circleWrap: {
    position: 'absolute',
    top: -45,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  circleImg: { width: '100%', height: '100%' },
  brand: { color: '#7a7a7a', marginTop: 60, marginBottom: 6 },
  title: { fontSize: 18, fontWeight: '700', color: colors.orange, marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 14, color: '#333', textAlign: 'center', lineHeight: 20, marginBottom: 14 },
  discountBadge: {
    backgroundColor: colors.brightOrange,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  discountText: { color: 'white', fontWeight: '700' },
  price: { fontSize: 16, fontWeight: '700', color: '#d01717', marginBottom: 16 },
  addButton: {
    backgroundColor: colors.orange,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});
