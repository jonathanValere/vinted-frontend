import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section>
      <div className="container">
        <div className={styles["not-found"]}>
          <p>Page non trouvée...</p>
          <Link to="/">Retour à la page d'accueil</Link>
        </div>
      </div>
    </section>
  );
}
