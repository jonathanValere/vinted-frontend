import styles from "./Info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Info() {
  return (
    <div className={styles["information-bloc"]}>
      <p className={styles.info}>
        <FontAwesomeIcon icon="circle-exclamation" /> Important : Cette réplique
        simplifiée a été réalisée dans le cadre de ma formation Développeur
        d'applications web & mobile chez{" "}
        <a href="https://www.lereacteur.io/" target="_blank">
          Le Reacteur
        </a>{" "}
        et à but non commercial
      </p>
    </div>
  );
}
