// src/screens/shop/CategoriesScreen.jsx
import React, { useMemo } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setCategorySelected } from "../../store/slices/shopSlice";
import { colors } from "../../global/colors";

const CategoriesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const categories = useSelector(state => state.shopReducer.categories);
  const dispatch = useDispatch();

  const bottomPad = useMemo(() => insets.bottom + 140, [insets.bottom]);

  const handleSelectCategory = (category) => {
    dispatch(setCategorySelected(category.title.toLowerCase()));
    navigation.navigate("Products", { category });
  };

  const renderCategoryItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => handleSelectCategory(item)}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCategoryItem}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        ListFooterComponent={<View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  list: { padding: 16, gap: 16 },
  card: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: { flex: 1, justifyContent: "center" },
  imageStyle: { borderRadius: 16 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
