import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DJPanel from "./pages/DJPanel";
import ClubScreen from "./pages/ClubScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dj" element={<DJPanel />} />
        <Route path="/club" element={<ClubScreen />} />
      </Routes>
    </Router>
  );
}

export default App;