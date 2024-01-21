import { useParams } from "react-router-dom";
import styles from "./Offer.module.css";
import Details from "../components/Details";
import Button from "../components/Button";

export default function Offer({ data }) {
  const { id } = useParams();
  return (
    <section className={styles["section-offer"]}>
      <div className="container">
        <article>
          {data.offers.map(
            (offer) =>
              offer._id === id && (
                <div key={offer._id} className={styles.product}>
                  <img
                    src={offer.product_image.secure_url}
                    alt="produit de l'image"
                    className={styles["product-image"]}
                  />
                  <aside className={styles.details}>
                    <h2>{offer.product_price} €</h2>
                    {offer.product_details.map((detail, index) => {
                      return (
                        <div key={index}>
                          {detail.MARQUE && (
                            <Details title="MARQUE" detail={detail.MARQUE} />
                          )}
                          {detail.TAILLE && (
                            <Details title="TAILLE" detail={detail.TAILLE} />
                          )}
                          {detail["ÉTAT"] && (
                            <Details title="ÉTAT" detail={detail.ÉTAT} />
                          )}
                          {detail.COULEUR && (
                            <Details title="COULEUR" detail={detail.COULEUR} />
                          )}
                          {detail.EMPLACEMENT && (
                            <Details
                              title="EMPLACEMENT"
                              detail={detail.EMPLACEMENT}
                            />
                          )}
                          {detail["MODES DE PAIEMENT"] && (
                            <Details
                              title="MODES DE PAIEMENT"
                              detail={detail.EMPLACEMENT}
                            />
                          )}
                        </div>
                      );
                    })}
                    <div className={styles["details-bottom"]}>
                      <p>{offer.product_name}</p>
                      <p>{offer.product_description}</p>
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
                    <Button
                      title="Acheter"
                      className={styles["button-offer"]}
                    />
                  </aside>
                </div>
              )
          )}
        </article>
      </div>
    </section>
  );
}
