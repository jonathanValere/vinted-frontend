import styles from "./Header.module.css";

import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo_vinted.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Info from "./Info";
import Filter from "./Filter";

export default function Header({
  token,
  setToken,
  visible,
  setVisible,
  data,
  setData,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    setToken(Cookies.remove("userToken"));
    navigate("/");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const copyData = [...data];
    const searchData = copyData.filter((product) =>
      product.product_name.toLowerCase().includes(value)
    );
    setSearch(value);
    setData(searchData);
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
              onChange={handleSearch}
              value={search}
            />
          </div>
          <nav className={styles["navigation-header"]}>
            {token ? (
              <button onClick={handleLogout} className={styles["logout-btn"]}>
                Se déconnecter
              </button>
            ) : (
              <>
                {/* <Link to="/signup">S'inscrire</Link> */}
                <Link onClick={() => setVisible(!visible)}>S'inscrire</Link>

                <Link to="/login">Se connecter</Link>
              </>
            )}

            <Link to="/publish">Vends tes articles</Link>
          </nav>
        </div>
        <Filter data={data} setData={setData} />
      </div>
    </header>
  );
}
