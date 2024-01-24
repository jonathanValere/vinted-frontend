import styles from "./Filter.module.css";

export default function Filter() {
  return (
    <div className={styles.filter}>
      <div>
        <span>
          Trier par prix : <button>ascendant</button>{" "}
          <button>descendant</button>
        </span>
        <span>Prix entre : </span>
      </div>
    </div>
  );
}
