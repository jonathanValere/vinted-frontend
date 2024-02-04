import "./App.css";

// Import packages
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCircleExclamation,
  faXmark,
  faHandPointUp,
  faPlus,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faCircleExclamation,
  faXmark,
  faHandPointUp,
  faPlus,
  faPowerOff
);

// Import composants
import Header from "./components/Header";
import Modal from "./components/Modal";

// Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

function App() {
  const url = "https://site--backend-vinted--lkcrzmx4xyh5.code.run/offers"; // url du backend
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [visible, setVisible] = useState(false); // State pour la Modal
  const [data, setData] = useState([]); // State pour les données
  const [search, setSearch] = useState(""); // State pour la barre de recherche
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
        search={search}
        setSearch={setSearch}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                setData={setData}
                url={url}
                token={token}
                search={search}
              />
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
