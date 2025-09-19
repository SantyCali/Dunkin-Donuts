// src/navigation/cart/CartStackNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../screens/cart/CartScreen';
import OrderTicketScreen from '../../screens/cart/OrderTicketScreen';
import Header from '../../components/Header';

const Stack = createNativeStackNavigator();

const CartStackNavigator = () => (
  <Stack.Navigator
    screenOptions={({ route, navigation, back }) => ({
      header: () => (
        <Header
          title="Dunkin' Donuts"
          subtitle={route.name === 'CartHome' ? 'Tu carrito' : 'Ticket'}
          navigation={navigation}
          canGoBack={!!back}
        />
      ),
    })}
  >
    <Stack.Screen name="CartHome" component={CartScreen} />
    <Stack.Screen name="OrderTicket" component={OrderTicketScreen} />
  </Stack.Navigator>
);

export default CartStackNavigator;
