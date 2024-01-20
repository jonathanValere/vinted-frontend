import styles from "./Product.module.css";

// Composant d'un produit
export default function Product({ ...props }) {
  return (
    <article className={styles.product}>
      <div>
        {props.offer.owner.account.avatar && (
          <img
            src={props.offer.owner.account.avatar.secure_url}
            alt="avatar"
            width={20}
            height={20}
          />
        )}
        {props.offer.owner.account.username}
      </div>
      <img src={props.offer.product_image.secure_url} alt="image du produit" />
      <div>
        <p>{props.offer.product_price} €</p>
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
