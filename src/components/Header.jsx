import styles from "./Header.module.css";

import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo_vinted.svg";
import { Link, useNavigate } from "react-router-dom";
import Info from "./Info";
import Filter from "./Filter";

export default function Header({ filter, token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(Cookies.remove("userToken"));
    navigate("/");
  };

  return (
    <header>
      <Info />
      <div className="container">
        <div className={styles["header-custom"]}>
          <Link to="/">
            <img src={logo} alt="Logo vinted" className={styles.logo} />
          </Link>
          <div className={styles.searchbar}>
            <FontAwesomeIcon icon="magnifying-glass" />
            <input
              type="search"
              name="search"
              placeholder="Rechercher des articles"
            />
          </div>
          <nav className={styles["navigation-header"]}>
            {token ? (
              <button onClick={handleLogout} className={styles["logout-btn"]}>
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to="/signup">S'inscrire</Link>
                <Link to="/login">Se connecter</Link>
              </>
            )}

            <Link>Vends tes articles</Link>
          </nav>
        </div>
        {filter && <Filter />}
      </div>
    </header>
  );
}
