// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../global/colors';

const Search = ({ placeholder = 'Buscar…', setKeyword }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setKeyword?.(text);
  }, [text, setKeyword]);

  const clear = () => setText('');

  return (
    <View style={styles.wrap}>
      <Feather name="search" size={20} color="#666" style={styles.iconLeft} />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        returnKeyType="search"
      />
      {text.length > 0 && (
        <Pressable onPress={clear} hitSlop={10} style={styles.iconRight}>
          <Feather name="x" size={18} color="#666" />
        </Pressable>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  input: { flex: 1, color: '#222' },
  iconLeft: { position: 'absolute', left: 12 },
  iconRight: { position: 'absolute', right: 12 },
});
