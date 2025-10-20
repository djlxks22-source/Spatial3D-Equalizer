import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SwitchItem from '../components/SwitchItem';
import { initAudio, setBassBoost, set3DAudio } from '../services/AudioProcessor';

export default function HomeScreen() {
  const [bass, setBass] = useState(false);
  const [atmos, setAtmos] = useState(false);

  useEffect(() => {
    initAudio();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EQ Master 3D</Text>

      <SwitchItem
        label="Bass Boost"
        value={bass}
        onValueChange={(v) => {
          setBass(v);
          setBassBoost(v);
        }}
      />

      <SwitchItem
        label="Áudio 3D"
        value={atmos}
        onValueChange={(v) => {
          setAtmos(v);
          set3DAudio(v);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 60 },
});
