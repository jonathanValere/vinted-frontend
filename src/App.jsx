import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
library.add(faMagnifyingGlass, faCircleExclamation, faXmark);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [visible, setVisible] = useState(false);
  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        visible={visible}
        setVisible={setVisible}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} setVisible={setVisible} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {visible && <Modal setVisible={setVisible} />}
    </Router>
  );
}

export default App;
