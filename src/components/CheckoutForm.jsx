import styles from "./CheckoutForm.module.css";

// Import packages
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

export default function CheckoutForm({ url, state, total }) {
  const stripe = useStripe();
  const elements = useElements();

  const urlPayment = url + "/payment"; // url Back

  // Récupérer les données de l'offre
  const { title, price } = state;

  const [completed, setCompleted] = useState(false); // State de validation du paiement

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Récupérer les codes de la carte
      const cardElement = elements.getElement(CardElement);
      // Création du token de la part de stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      // Stocker le token envoyé par stripe
      const stripeToken = stripeResponse.token.id;
      // Requète vers mon back avec le stripeToken et les différents éléments de l'offre
      const response = await axios.post(urlPayment, {
        stripeToken: stripeToken,
        amount: total,
        description: title,
      });
      // Si la commande est validée, change le state completed
      response.data === "succeeded" && setCompleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return completed ? (
    <p>Paiement effectué!</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className={styles["button-pay"]}>
        Pay
      </button>
    </form>
  );
}
