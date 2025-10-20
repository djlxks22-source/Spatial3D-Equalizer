import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';
import { startAudio, setBassBoost, set3DAudio } from '../services/AudioEngine';

export default function HomeScreen() {
  const [bass, setBass] = useState(false);
  const [atmos, setAtmos] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EQ Master FREE</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Bass Boost</Text>
        <Switch value={bass} onValueChange={(v) => {
          setBass(v);
          setBassBoost(v);
        }} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Áudio 3D</Text>
        <Switch value={atmos} onValueChange={(v) => {
          setAtmos(v);
          set3DAudio(v);
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 32, color: '#0f0', fontWeight: 'bold', marginBottom: 50 },
  row: { flexDirection: 'row', alignItems: 'center', margin: 20 },
  label: { color: '#fff', fontSize: 18, width: 120 },
});
