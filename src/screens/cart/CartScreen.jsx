// src/screens/cart/CartScreen.jsx
import React, { useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../../global/colors'
import { removeItemFromCart, clearCart } from '../../store/slices/cartSlice'
import { addOrder } from '../../store/slices/ordersSlice'

const HERO_IMG = {
  uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop',
}

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((s) => s.cartReducer.cartItems)
  const orders = useSelector((s) => s.ordersReducer.orders)

  const total = useMemo(
    () => cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [cartItems]
  )

  const handleConfirm = () => {
    if (!cartItems.length) return
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    }
    dispatch(addOrder(order))
    dispatch(clearCart())
  }

  const Banner = ({ order }) => (
    <View style={styles.confirmCard}>
      <Text style={styles.confirmTitle}>¡Compra confirmada!</Text>
      <Text style={styles.confirmText}>
        Nº {order.id.slice(-6)} · {order.items.length} ítem(s) · Total ${order.total}
      </Text>
      <Pressable
        style={styles.seeTicketBtn}
        onPress={() => navigation.getParent()?.navigate('TicketTab')}
      >
        <Text style={styles.seeTicketText}>Ver ticket</Text>
      </Pressable>
    </View>
  )

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.circleWrap}>
        <Image source={{ uri: item.mainImage }} style={styles.circleImg} resizeMode="cover" />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cantidad:</Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${item.price * item.quantity}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => dispatch(removeItemFromCart(item.id))}
        style={styles.trashBtn}
        hitSlop={8}
      >
        <MaterialIcons name="delete" size={20} color="#fff" />
      </Pressable>
    </View>
  )

  const ListHeader = () => (
    <>
      {/* HERO */}
      <View style={styles.heroBox}>
        <ImageBackground source={HERO_IMG} style={styles.hero} imageStyle={styles.heroImg}>
          <View style={styles.heroOverlay} />
        </ImageBackground>
      </View>

      {/* BANNERS */}
      {!!orders.length && (
        <View style={styles.bannersWrap}>
          {([...orders].reverse()).map((o) => <Banner key={o.id} order={o} />)}
        </View>
      )}
    </>
  )

  const ListFooter = () => (
    cartItems.length ? (
      <View style={styles.footer}>
        <View style={styles.totalPill}>
          <Text style={styles.totalPillText}>Total a Pagar: ${total}</Text>
        </View>
        <Pressable style={styles.cta} onPress={handleConfirm}>
          <Text style={styles.ctaText}>Confirmar compra</Text>
        </Pressable>
      </View>
    ) : (
      <View style={{ padding: 24 }}>
        <Text style={{ textAlign: 'center' }}>Aún no hay productos en el carrito</Text>
      </View>
    )
  )

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(it) => String(it.id)}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      contentContainerStyle={styles.list}
      bounces
    />
  )
}

export default CartScreen

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 140,
    gap: 14,
  },

  /* HERO */
  heroBox: { paddingBottom: 28 },
  hero: { height: 120, justifyContent: 'flex-end' },
  heroImg: { borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  /* BANNERS */
  bannersWrap: { gap: 10, marginBottom: 4, marginTop: -6 },
  confirmCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    gap: 6,
  },
  confirmTitle: { fontWeight: '800', color: '#1f1f1f' },
  confirmText: { color: '#444' },
  seeTicketBtn: {
    backgroundColor: colors.orange,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 6,
  },
  seeTicketText: { color: '#fff', fontWeight: '800' },

  /* ITEMS */
  card: {
    backgroundColor: '#fff7f4',
    borderRadius: 20,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    marginRight: 12,
  },
  circleImg: { width: '100%', height: '100%' },
  info: { flex: 1, gap: 6 },
  title: { color: colors.orange, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { color: '#222', fontWeight: '700' },
  value: { color: '#111' },
  total: { color: '#d01717', fontWeight: '800' },
  trashBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  /* FOOTER */
  footer: { marginTop: 8, alignItems: 'center', gap: 12, paddingBottom: 24 },
  totalPill: { backgroundColor: '#f3d9d1', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 24 },
  totalPillText: { color: '#b71c1c', fontWeight: '800' },
  cta: { width: '100%', backgroundColor: colors.orange, borderRadius: 28, paddingVertical: 14, alignItems: 'center', elevation: 2 },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 16 },
})
