import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./navigation/BottomTabs";
import { PollsProvider } from "./context/PollsContext"; // <- добави този ред

export default function App() {
  return (
    <PollsProvider>           {/* <- Тук обвиваме NavigationContainer */}
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </PollsProvider>
  );
}