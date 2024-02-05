import styles from "./Payment.module.css";

//import packages
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// Import composants
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OgEAoL01W0zMaRpyQLo2JfqJI0Nsc4xJp7XorqEahc0N5KIdItsexxHNI5C1ccaAYxdSKPiVOhccYvgr2qt5tHC00fbPBuRzk"
);

export default function Payment({ url }) {
  const location = useLocation();
  const { state } = location;
  const { price, title } = state;

  // Calculer le total
  const feeProtection = 0.4;
  const feePort = 0.8;
  const total = price + feeProtection + feePort;

  return (
    <section className={styles["section-payment"]}>
      <div className="container">
        <div className={styles["bloc-commande"]}>
          <div className={styles.commande}>
            <div className={styles["part-commande"]}>
              <h1 className={styles.title}>Résumé de la commande</h1>
              <div className={styles.line}>
                <p>Commande</p>
                <span>{price} €</span>
              </div>
              <div className={styles.line}>
                <p>Frais protection acheteurs</p>
                <span>{feeProtection.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className={styles.line}>
                <p>Frais de port</p>
                <span>{feePort.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>
            <div className={styles["part-commande"]}>
              <div className={`${styles.line} ${styles.total}`}>
                <p>Total</p>
                <span>{total.toFixed(2).replace(".", ",")} €</span>
              </div>
              <p className={styles["last-step"]}>
                Il ne vous rest plus qu'une étape pour vous offrir.... Vous
                allez payer (prix) (frais de protection et frais de port
                inclus).
              </p>
              <Elements stripe={stripePromise}>
                <CheckoutForm url={url} state={state} total={total} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
