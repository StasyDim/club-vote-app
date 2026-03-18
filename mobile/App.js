import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API = "http://YOUR_LOCAL_IP:3000";

export default function App() {
  const [round, setRound] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(fetchRound, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchRound = async () => {
    const res = await axios.get(`${API}/rounds/current`);
    setRound(res.data);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) setImage(result.assets[0]);
  };

  const vote = async (songId, type) => {
    const form = new FormData();
    form.append("roundId", round._id);
    form.append("songId", songId);
    form.append("type", type);
    if (type === "paid") {
      form.append("message", text);
      if (image) {
        form.append("image", {
          uri: image.uri,
          name: "photo.jpg",
          type: "image/jpeg"
        });
      }
    }
    await axios.post(`${API}/vote`, form, { headers: { "Content-Type": "multipart/form-data" } });
    setText(""); setImage(null);
  };

  if (!round) return <Text>No active round</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voting</Text>
      <FlatList
        data={round.playlist}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Button title="Free Vote" onPress={() => vote(item._id, "free")} />
            <Button title="Paid Vote" onPress={() => vote(item._id, "paid")} />
          </View>
        )}
      />
      <TextInput placeholder="Message (paid vote)" value={text} onChangeText={setText} style={styles.input} />
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  card: { marginVertical: 8, padding: 10, backgroundColor: "#ededed" },
  input: { borderWidth: 1, marginVertical: 10, padding: 8 },
  preview: { width: "100%", height: 200, marginTop: 10 }
});