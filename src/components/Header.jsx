import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo_vinted.svg";
import { Link } from "react-router-dom";
import Button from "./Button";
import Info from "./Info";
import Filter from "./Filter";

export default function Header({ filter }) {
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
            <Button title="S'inscrire" />
            <Button title="Se connecter" />
            <Button title="Vends tes articles" />
          </nav>
        </div>
        {filter && <Filter />}
      </div>
    </header>
  );
}
