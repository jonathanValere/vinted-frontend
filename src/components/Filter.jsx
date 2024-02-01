import styles from "./Filter.module.css";

import { useSearchParams } from "react-router-dom";

export default function Filter({ data, setData, url }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Gestion filtrage ordre de prix croissant/décroissant -----------------
  const handleFilter = (filter) => {
    const dataCopy = [...data];

    if (filter === "asc") {
      dataCopy.sort(function (a, b) {
        return a.product_price - b.product_price;
      });

      setSearchParams({ sort: "price-asc" });
    }

    if (filter === "desc") {
      dataCopy.sort(function (a, b) {
        return b.product_price - a.product_price;
      });

      setSearchParams({ sort: "price-desc" });
    }

    setData(dataCopy);
  };

  return (
    <div className={styles.filter}>
      <div>
        <span>
          Trier par prix :{" "}
          <button onClick={() => handleFilter("asc")}>ascendant</button>{" "}
          <button onClick={() => handleFilter("desc")}>descendant</button>
        </span>
        <span>Prix entre : </span>
      </div>
    </div>
  );
}
