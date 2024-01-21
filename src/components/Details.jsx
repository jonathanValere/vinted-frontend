import styles from "./Details.module.css";

export default function Details({ title, detail }) {
  return (
    <div className={styles["details-info"]}>
      <span>{title.toUpperCase()}</span>
      <span>{detail.toUpperCase()}</span>
    </div>
  );
}
