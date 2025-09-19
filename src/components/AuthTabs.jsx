// src/components/AuthTabs.jsx
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function AuthTabs({ active = "login", onSwitch }) {
  const targetIndex = active === "signup" ? 1 : 0;
  const anim = useRef(new Animated.Value(targetIndex)).current;
  const [w, setW] = useState(0);
  const PADDING = 4;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: targetIndex,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [targetIndex, anim]);

  const segWidth = Math.max(w - PADDING * 2, 0);
  const pillWidth = segWidth / 2;
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, pillWidth],
  });

  const handlePress = (to) => {
    if (to === active) return;

    Animated.timing(anim, {
      toValue: to === "signup" ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onSwitch) onSwitch(to);
    });
  };

  return (
    <View
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={styles.tabs}
    >

      <Animated.View
        pointerEvents="none"
        style={[
          styles.pill,
          {
            width: pillWidth,
            transform: [{ translateX }],
          },
        ]}
      />
      <Pressable style={styles.tab} onPress={() => handlePress("login")}>
        <Text style={[styles.tabText, active === "login" ? styles.activeText : styles.inactiveText]}>
          Login
        </Text>
      </Pressable>
      <Pressable style={styles.tab} onPress={() => handlePress("signup")}>
        <Text style={[styles.tabText, active === "signup" ? styles.activeText : styles.inactiveText]}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 22,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    zIndex: 1, 
  },
  pill: {
    position: "absolute",
    left: 4,
    top: 4,
    bottom: 4,
    borderRadius: 18,
    backgroundColor: "#F36B1D", 
    zIndex: 0,
  },
  tabText: { fontWeight: "700", fontSize: 14 },
  activeText: { color: "#FFFFFF" },
  inactiveText: { color: "#2b2b2b" },
});
