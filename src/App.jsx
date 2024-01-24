import "./App.css";
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
import NotFound from "./pages/NotFound";
library.add(
  faEnvelope,
  faKey,
  faListAlt,
  faMagnifyingGlass,
  faCircleExclamation
);

function App() {
  const url = "https://lereacteur-vinted-api.herokuapp.com/offers";
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
