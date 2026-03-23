# Създаване на папки
$folders = @("assets\images", "screens", "components", "navigation", "constants")
foreach ($f in $folders) { New-Item -ItemType Directory -Force -Path $f }

# Създаване на файлове
$files = @(
    "App.js",
    "package.json",
    "constants\Colors.js",
    "components\PollCard.js",
    "screens\HomeScreen.js",
    "screens\CreatePollScreen.js",
    "screens\ResultsScreen.js",
    "screens\ProfileScreen.js",
    "navigation\BottomTabs.js"
)
foreach ($file in $files) { New-Item -ItemType File -Force -Path $file }

# Populirane na constants/Colors.js
@"
export const COLORS = {
  background: '#0B0F1A',
  card: '#121826',
  primary: '#FF2E63',
  secondary: '#08D9D6',
  accent: '#F9ED69',
  text: '#FFFFFF',
  muted: '#9CA3AF'
};
"@ | Set-Content constants\Colors.js

# Populirane na components/PollCard.js
@"
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
"@ | Set-Content components\PollCard.js

# Populirane na screens/HomeScreen.js
@"
import React from 'react';
import { ScrollView } from 'react-native';
import PollCard from '../components/PollCard';

export default function HomeScreen() {
  const polls = [
    { question: '🎬 Кой филм да гледаме?', options: ['Interstellar', 'Inception', 'Dark Knight'] },
    { question: '🍕 Каква пица да поръчаме?', options: ['Маргарита', 'Пеперони', 'Вегетарианска'] }
  ];
  return (
    <ScrollView style={{ backgroundColor: '#0B0F1A' }}>
      {polls.map((poll, i) => <PollCard key={i} question={poll.question} options={poll.options} />)}
    </ScrollView>
  );
}
"@ | Set-Content screens/HomeScreen.js

# Populirane na screens/CreatePollScreen.js
@"
import React from 'react';
import { View, Text } from 'react-native';

export default function CreatePollScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F1A', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>Тук ще бъде Create Poll screen</Text>
    </View>
  );
}
"@ | Set-Content screens/CreatePollScreen.js

# Populirane na screens/ResultsScreen.js
@"
import React from 'react';
import { View, Text } from 'react-native';

export default function ResultsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F1A', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>Тук ще бъде Results screen</Text>
    </View>
  );
}
"@ | Set-Content screens/ResultsScreen.js

# Populirane na screens/ProfileScreen.js
@"
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F1A', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#FFF', fontSize: 20 }}>Тук ще бъде Profile screen</Text>
    </View>
  );
}
"@ | Set-Content screens/ProfileScreen.js

# Populirane na navigation/BottomTabs.js
@"
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePollScreen from '../screens/CreatePollScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121826' },
        tabBarActiveTintColor: '#FF2E63',
        tabBarInactiveTintColor: '#9CA3AF'
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Create' component={CreatePollScreen} />
      <Tab.Screen name='Results' component={ResultsScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}
"@ | Set-Content navigation/BottomTabs.js

# Populirane na App.js
@"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
"@ | Set-Content App.js

Write-Host "✅ Структурата и кода са готови! Можеш да стартираш с 'npx expo start'"