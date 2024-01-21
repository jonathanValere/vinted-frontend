import styles from "./Details.module.css";

export default function Details({ title, detail }) {
  return (
    <div className={styles["details-info"]}>
      <span>{title}</span>
      <span>{detail}</span>
    </div>
  );
}
