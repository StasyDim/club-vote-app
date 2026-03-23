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
