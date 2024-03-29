import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <div className="container">
        <div className={styles["not-found"]}>
          <p>La page n'existe pas...</p>
          <p>
            Désolé, mais on dirait que cette page n'existe pas. Pourquoi ne pas
            revenir en arrière et essayer autre chose ?
          </p>
          <Link to="/">Retour à la page d'accueil</Link>
        </div>
      </div>
    </section>
  );
}
