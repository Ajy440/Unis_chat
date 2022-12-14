import Login from "./auth/Login";
import Signup from "./auth/Signup";
import FourOFour from "./components/404";
import Landing from "./Landing/index";
import Chat from "./chat/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<FourOFour />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/Unis_chat" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
