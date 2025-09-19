import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../global/colors'

const OrderTicketScreen = () => {
  const orders = useSelector((s) => s.ordersReducer.orders)

  if (!orders.length) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.empty}>No hay ticket para mostrar</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={[...orders].reverse()}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ gap: 16, paddingBottom: 80 }} 
        renderItem={({ item: order }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Ticket</Text>
            <Text style={styles.subtitle}>
              Nº {order.id.slice(-6)} · {new Date(order.createdAt).toLocaleString()}
            </Text>

            <FlatList
              data={order.items}
              keyExtractor={(it) => String(it.id)}
              scrollEnabled={false} 
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.qty}>x{item.quantity}</Text>
                  <Text style={styles.amount}>${item.price * item.quantity}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
            />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${order.total}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default OrderTicketScreen

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2efed', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 18, fontWeight: '800', color: colors.orange },
  subtitle: { color: '#666', marginTop: 2, marginBottom: 12 },

  row: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { flex: 1, fontWeight: '600', color: '#222' },
  qty: { width: 36, textAlign: 'center', color: '#444' },
  amount: { width: 80, textAlign: 'right', fontWeight: '700', color: '#222' },
  sep: { height: 1, backgroundColor: 'rgba(0,0,0,0.06)', marginVertical: 8 },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 12,
  },
  totalLabel: { fontWeight: '800', color: '#111' },
  totalValue: { fontWeight: '800', color: '#111' },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { fontWeight: '700', color: '#555' },
})
