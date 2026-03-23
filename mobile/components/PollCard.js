import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/Colors';

export default function PollCard({ question, options }) {
  const [voted, setVoted] = useState(null);
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.option, voted === i && styles.selected]}
          onPress={() => setVoted(i)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Гласувай 🚀</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, padding: 20, borderRadius: 20, margin: 16 },
  question: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  option: { padding: 15, borderRadius: 12, backgroundColor: '#1F2937', marginBottom: 10 },
  selected: { backgroundColor: COLORS.secondary },
  optionText: { color: COLORS.text, fontSize: 16 },
  button: { marginTop: 10, padding: 15, borderRadius: 15, backgroundColor: COLORS.primary, alignItems: 'center' },
  buttonText: { color: COLORS.text, fontWeight: 'bold' }
});
