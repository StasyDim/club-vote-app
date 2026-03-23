import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../constants/Colors";

export default function CreatePollScreen() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const updateOption = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const createPoll = () => {
    console.log("Poll Created:", { question, options });
    alert("Анкетата е създадена!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Създай нова анкета</Text>
      <TextInput
        style={styles.input}
        placeholder="Въпрос"
        placeholderTextColor={COLORS.muted}
        value={question}
        onChangeText={setQuestion}
      />
      {options.map((opt, i) => (
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`Опция ${i + 1}`}
          placeholderTextColor={COLORS.muted}
          value={opt}
          onChangeText={(text) => updateOption(text, i)}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addOption}>
        <Text style={styles.addButtonText}>+ Добави опция</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createButton} onPress={createPoll}>
        <Text style={styles.createButtonText}>Създай анкета 🚀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text, marginBottom: 20 },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10
  },
  addButtonText: { color: COLORS.background, fontWeight: "bold" },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  createButtonText: { color: COLORS.text, fontWeight: "bold", fontSize: 16 }
});