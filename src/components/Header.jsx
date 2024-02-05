import styles from "./Header.module.css";

import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

import Info from "./Info";
import Filter from "./Filter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logo_vinted.svg";

export default function Header({
  token,
  setToken,
  visible,
  setVisible,
  data,
  setData,
  search,
  setSearch,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // A FAIRE !!!

  const handleLogout = () => {
    setToken(Cookies.remove("userToken"));
    navigate("/");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    return setSearch(value);
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
                <FontAwesomeIcon icon="power-off" /> Se déconnecter
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
        {location.pathname === "/" && <Filter data={data} setData={setData} />}
      </div>
    </header>
  );
}
