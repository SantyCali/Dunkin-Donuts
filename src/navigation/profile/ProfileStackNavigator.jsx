// src/navigation/profile/ProfileStackNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import Header from '../../components/Header';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Perfil"
      screenOptions={({ navigation }) => ({
        header: () => (
          <Header
            title="Dunkkin Donuts"
            subtitle="Perfil"
            navigation={navigation}
          />
        ),
      })}
    >
      <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
