import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faMagnifyingGlass,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
library.add(
  faEnvelope,
  faKey,
  faListAlt,
  faMagnifyingGlass,
  faCircleExclamation
);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
