// src/navigation/tabs/TabsNavigator.jsx
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../global/colors'

import ShopStackNavigator from '../shop/ShopStackNavigator'
import CartStackNavigator from '../cart/CartStackNavigator'
import ProfileStackNavigator from '../profile/ProfileStackNavigator'
import TicketStackNavigator from '../ticket/TicketStackNavigator'

const Tab = createBottomTabNavigator()

const UnderlinedIcon = ({ children, focused }) => (
  <View style={styles.iconWrap}>
    {children}
    <View
      style={[
        styles.underline,
        { backgroundColor: focused ? colors.orange : '#000' },
      ]}
    />
  </View>
)

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <UnderlinedIcon focused={focused}>
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? colors.orange : '#000'}
              />
            </UnderlinedIcon>
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <UnderlinedIcon focused={focused}>
              <Feather
                name="shopping-cart"
                size={24}
                color={focused ? colors.orange : '#000'}
              />
            </UnderlinedIcon>
          ),
        }}
      />

<Tab.Screen
  name="TicketTab"
  component={TicketStackNavigator}
  options={{
    tabBarIcon: ({ focused }) => (
      <UnderlinedIcon focused={focused}>
        <Feather
          name="file-text"   
          size={24}
          color={focused ? colors.orange : '#000'}
        />
      </UnderlinedIcon>
    ),
  }}
/>






      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <UnderlinedIcon focused={focused}>
              <Feather
                name="user"
                size={24}
                color={focused ? colors.orange : '#000'}
              />
            </UnderlinedIcon>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    height: 64,
    borderRadius: 28,
    backgroundColor: '#e9e9e9',
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    paddingHorizontal: 18,
  },
  iconWrap: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  underline: { width: 36, height: 3, borderRadius: 3, marginTop: 2 },
})
