import React, { createContext, useState } from "react";

export const PollsContext = createContext();

export const PollsProvider = ({ children }) => {
  const [polls, setPolls] = useState([
    { question: "🎬 Кой филм да гледаме?", options: ["Interstellar", "Inception", "Dark Knight"] },
    { question: "🍕 Каква пица да поръчаме?", options: ["Маргарита", "Пеперони", "Вегетарианска"] }
  ]);

  const addPoll = (newPoll) => setPolls([newPoll, ...polls]);

  return (
    <PollsContext.Provider value={{ polls, addPoll }}>
      {children}
    </PollsContext.Provider>
  );
};