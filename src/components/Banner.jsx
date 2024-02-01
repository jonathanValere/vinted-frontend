import styles from "./Banner.module.css";

import Button from "./Button";

import hero from "../assets/img/hero.svg";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <img src={hero} className={styles.hero} />
      <div className="container">
        <div className={styles["bloc-info"]}>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Button title="Commencer à vendre" />
        </div>
      </div>
    </div>
  );
}
