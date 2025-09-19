// src/navigation/places/PlacesStackNavigator.jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlacesScreen from '../../screens/places/PlacesScreen'
import AddPlaceScreen from '../../screens/places/AddPlaceScreen'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator()

const PlacesStackNavigator = () => (
  <Stack.Navigator
    screenOptions={({ route, navigation, back }) => ({
      header: () => (
        <Header
          title="Dunkin' Donuts"
          subtitle={route.name === 'Places' ? 'Ubicaciones' : 'Agregar ubicación'}
          navigation={navigation}
          canGoBack={!!back}
        />
      ),
    })}
  >
    <Stack.Screen name="Places" component={PlacesScreen} />
    <Stack.Screen name="AddPlace" component={AddPlaceScreen} />
  </Stack.Navigator>
)

export default PlacesStackNavigator
