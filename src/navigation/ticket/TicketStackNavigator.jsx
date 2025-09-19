import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderTicketScreen from '../../screens/cart/OrderTicketScreen'
import Header from '../../components/Header'
import { useRoute } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const TicketStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation, back }) => ({
        header: () => (
          <Header
            title="Dunkin' Donuts"
            subtitle="Ticket de compra"
            navigation={navigation}
            canGoBack={!!back}
          />
        ),
      })}
    >
      <Stack.Screen name="OrderTicket" component={OrderTicketScreen} />
    </Stack.Navigator>
  )
}

export default TicketStackNavigator
