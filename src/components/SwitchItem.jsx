import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SwitchItem({ label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  label: { color: '#fff', fontSize: 18, width: 120 },
});
