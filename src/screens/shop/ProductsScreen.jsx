// src/screens/shop/ProductsScreen.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
  ImageBackground,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useSelector, useDispatch } from 'react-redux';
import { setProductSelected } from '../../store/slices/shopSlice';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';
import productsLocal from '../../data/products.json';
import { colors } from '../../global/colors';
import Search from '../../components/Search';

const HERO_IMG = { uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop' };

const BLURHASH =
  'LGF5]+Yk^6#M@-5c,1J5R*%MRjRj';

const toSlug = (str = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'y')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const normalize = (str = '') =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const alias = (q = '') => {
  let s = q;
  s = s.replace(/\bexpreso\b/g, 'espresso');
  s = s.replace(/\bexpresso\b/g, 'espresso');
  s = s.replace(/\bexpress\b/g, 'espresso');
  return s;
};

const Card = ({ item, onPress }) => (
  <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.95 }]} onPress={onPress}>
    <View style={styles.circleWrap}>
      <ExpoImage
        source={{ uri: item.mainImage }}
        placeholder={BLURHASH}
        style={styles.circleImg}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
    </View>

    <View style={styles.cardBody}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardPrice}>${item.price}</Text>
    </View>
  </Pressable>
);

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');
  const category = useSelector((state) => state.shopReducer.categorySelected);
  const dispatch = useDispatch();
  const slug = useMemo(() => toSlug(category || ''), [category]);

  const {
    data: productsByCategoryApi = [],
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(slug, { skip: !slug });

  const baseList = useMemo(() => {
    if (!slug) return [];
    return error || !productsByCategoryApi?.length
      ? productsLocal.filter((p) => (p.category || '').toLowerCase() === slug)
      : productsByCategoryApi;
  }, [slug, productsByCategoryApi, error]);

  const debounceRef = useRef();
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = normalize(alias(keyword));
      if (!q) {
        setProductsFiltered(baseList);
        return;
      }
      const out = baseList.filter((p) => {
        const hay = normalize(`${p.title} ${p.brand || ''} ${(p.tags || []).join(' ')}`);
        return hay.includes(q);
      });
      setProductsFiltered(out);
    }, 180);
    return () => clearTimeout(debounceRef.current);
  }, [keyword, baseList]);

  useEffect(() => {
    setProductsFiltered(baseList);
  }, [baseList]);

  const handleSelectProduct = (product) => {
    dispatch(setProductSelected(product));
    navigation.navigate('Product');
  };

  if (!category) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Elegí una categoría primero…</Text>
      </View>
    );
  }

  if (isLoading && !productsFiltered.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.heroBox}>
        <ImageBackground source={HERO_IMG} style={styles.hero} imageStyle={styles.heroImg}>
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>¿Qué café quiere tomar?</Text>
        </ImageBackground>
        <View style={styles.searchHolder}>
          <Search placeholder="Search..." setKeyword={setKeyword} />
        </View>
      </View>

      <FlatList
        key="cols-2"
        numColumns={2}
        data={productsFiltered}
        keyExtractor={(item) => String(item.id ?? item.title)}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Card item={item} onPress={() => handleSelectProduct(item)} />}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2efed' },

  /* HERO */
  heroBox: { paddingBottom: 28, backgroundColor: 'transparent' },
  hero: {
    height: 140,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroImg: {
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  heroTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  searchHolder: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: -22,
  },

  /* GRID */
  list: { paddingTop: 36, paddingHorizontal: 12, paddingBottom: 16 },
  row: { justifyContent: 'space-between' },

  /* CARD */
  card: {
    width: '48%',
    backgroundColor: '#fff7f4',
    borderRadius: 20,
    paddingTop: 36,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  circleWrap: {
    position: 'absolute',
    top: -30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  circleImg: { width: '100%', height: '100%' },
  cardBody: { width: '100%', marginTop: 50, alignItems: 'center' },
  cardTitle: { fontWeight: '700', color: '#222', textAlign: 'center' },
  cardPrice: { marginTop: 6, fontWeight: '700', color: '#d01717' },
});
