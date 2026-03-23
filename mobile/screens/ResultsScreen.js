import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS } from "../constants/Colors";

export default function ResultsScreen() {
  const results = [
    { option: "Interstellar", percent: 70 },
    { option: "Inception", percent: 30 }
  ];

  // Създаваме Animated стойности за всяка опция
  const animatedValues = useRef(results.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = results.map((res, i) =>
      Animated.timing(animatedValues[i], {
        toValue: res.percent,
        duration: 1000,
        useNativeDriver: false
      })
    );
    Animated.stagger(200, animations).start(); // stagger = плавен ефект
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Резултати от анкета</Text>
      {results.map((res, i) => (
        <View key={i} style={styles.resultRow}>
          <Text style={styles.option}>{res.option}</Text>
          <View style={styles.barBackground}>
            <Animated.View
              style={[
                styles.barFill,
                { width: animatedValues[i].interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }
              ]}
            />
          </View>
          <Text style={styles.percent}>{res.percent}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text, marginBottom: 20 },
  resultRow: { marginBottom: 15 },
  option: { color: COLORS.text, marginBottom: 5, fontSize: 16 },
  barBackground: { backgroundColor: COLORS.card, height: 20, borderRadius: 10, overflow: "hidden" },
  barFill: { backgroundColor: COLORS.primary, height: 20 },
  percent: { color: COLORS.text, marginTop: 5 }
});