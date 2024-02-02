import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCircleExclamation,
  faXmark,
  faHandPointUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faCircleExclamation,
  faXmark,
  faHandPointUp,
  faPlus
);

function App() {
  const url = "https://site--backend-vinted--lkcrzmx4xyh5.code.run/offers"; // url du backend
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        visible={visible}
        setVisible={setVisible}
        data={data}
        setData={setData}
        url={url}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home data={data} setData={setData} url={url} token={token} />
            }
          />
          <Route path="/publish" element={<Publish token={token} />} />
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
