import styles from "./Banner.module.css";
import Button from "./Button";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles["bloc-info"]}>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Button title="Commencer à vendre" />
        </div>
      </div>
    </div>
  );
}
