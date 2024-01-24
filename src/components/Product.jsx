import styles from "./Product.module.css";

// Composant d'un produit
export default function Product({ ...props }) {
  return (
    <article className={styles.product}>
      <div className={styles.username}>
        {props.offer.owner.account.avatar && (
          <img
            src={props.offer.owner.account.avatar.secure_url}
            alt="avatar"
            width={30}
            height={30}
          />
        )}
      </div>
      <img
        src={props.offer.product_image.secure_url}
        alt="image du produit"
        className={styles["product-image"]}
      />
      <div className={styles["product-infos"]}>
        <p className={styles["product-price"]}>{props.offer.product_price} €</p>
        {props.offer.product_details.map((el, index) => (
          <div key={index}>
            <p>{el.TAILLE}</p>
            <p>{el.MARQUE}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
