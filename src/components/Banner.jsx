import styles from "./Banner.module.css";

import hero from "../assets/img/hero.svg";
import { useNavigate } from "react-router-dom";

export default function Banner({ token }) {
  const navigate = useNavigate();

  const handleClick = () => {
    token ? navigate("/publish") : navigate("/login");
  };

  return (
    <div className={styles.banner}>
      <img src={hero} className={styles.hero} />
      <div className="container">
        <div className={styles["bloc-info"]}>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button className={styles.button} onClick={handleClick}>
            Commencer à vendre
          </button>
        </div>
      </div>
    </div>
  );
}
