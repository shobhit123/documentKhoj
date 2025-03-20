import "./App.css";
import DocumentUpload from "./Document";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBotPage from "./Document/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DocumentUpload />} />
          <Route path="/chat" element={<ChatBotPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
