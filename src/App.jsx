import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
library.add(
  faEnvelope,
  faKey,
  faListAlt,
  faMagnifyingGlass,
  faCircleExclamation
);

function App() {
  //Déclaration des states ---
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const handleClick = (offer) => {
  //   console.log(offer);
  // };

  // Gestion du useEffect ----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // -----

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home data={data} loading={isLoading} />} />
          <Route
            path="/offer/:id"
            element={<Offer data={data} loading={isLoading} />}
          />
          <Route path="/offer" element={<Offer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
