import styles from "./Offer.module.css";

// Import packages
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import composants
import Details from "../components/Details";

export default function Offer({ url, token }) {
  //Déclaration des states ---
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // use Navigate
  const navigate = useNavigate();

  //Récupération de l'ID de l'offre
  const { id } = useParams();

  // const urlBack = "https://site--backend-vinted--lkcrzmx4xyh5.code.run/offer/"; // Backend
  const urlOffer = `${url}/offer/${id}`; // url Back

  // Gestion du useEffect ----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(urlOffer);
      setOffer(response.data);
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };
  // -----

  const handleBuy = () => {
    // Utilisateur doit être connecté pour acheter
    token
      ? navigate("/payment", {
          state: {
            title: offer.product_description,
            price: offer.product_price,
          },
        })
      : navigate("/login");
  };

  return (
    <>
      <section className={styles["section-offer"]}>
        <div className="container">
          {isLoading ? (
            <p>En chargement...</p>
          ) : (
            <article>
              {offer._id === id && (
                <div key={offer._id} className={styles.product}>
                  <img
                    src={offer.product_image.secure_url}
                    alt="produit de l'image"
                    className={styles["product-image"]}
                  />
                  <aside className={styles.details}>
                    <h2>{offer.product_price} €</h2>
                    {offer.product_details.map((detail, index) => {
                      const keyTab = Object.keys(detail);
                      return (
                        <Details
                          key={index}
                          title={keyTab[0]}
                          detail={detail[keyTab[0]]}
                        />
                      );
                    })}
                    <div className={styles["details-bottom"]}>
                      <p>{offer.product_name}</p>
                      <p>{offer.product_description}</p>
                      {offer.product_change && (
                        <p className={styles.interesting}>
                          <FontAwesomeIcon icon="hand-point-up" />
                          Intéressé(e) pour un échange
                        </p>
                      )}
                      <div className={styles.username}>
                        {offer.owner.account.avatar && (
                          <img
                            src={offer.owner.account.avatar.secure_url}
                            alt="avatar"
                            width={45}
                            height={45}
                          />
                        )}
                        {offer.owner.account.username}
                      </div>
                    </div>
                    <button
                      className={styles["button-offer"]}
                      onClick={handleBuy}
                    >
                      Acheter
                    </button>
                  </aside>
                </div>
              )}
            </article>
          )}
        </div>
      </section>
    </>
  );
}
