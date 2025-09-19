import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductScreen, ProductsScreen } from "../../screens";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  const categorySelected = useSelector((s) => s.shopReducer.categorySelected);

  return (
    <Stack.Navigator
      initialRouteName="Categorias"
      screenOptions={({ route, navigation }) => ({
        header: () => (
          <Header
            title="Dunkin Donuts"
            subtitle={route.name === "Categorias" ? "Home" : (categorySelected || route.name)}
            navigation={navigation}
          />
        ),
      })}
    >
      <Stack.Screen name="Categorias" component={CategoriesScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;
