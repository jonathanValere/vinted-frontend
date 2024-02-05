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

  return (
    <section className={styles["section-payment"]}>
      <div className="container">
        <h1>Payment</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm url={url} state={state} />
        </Elements>
      </div>
    </section>
  );
}
