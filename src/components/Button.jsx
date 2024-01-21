import styles from "./Button.module.css";

export default function Button({ title }) {
  return <button className={styles["button-custom"]}>{title}</button>;
}
