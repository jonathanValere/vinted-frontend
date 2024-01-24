import { useState, useEffect } from "react";
import axios from "axios";

import Product from "../components/Product";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

export default function Home() {
  //Déclaration des states ---
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Gestion du useEffect ----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // -----
  return (
    <>
      <section>
        <Banner />
      </section>

      <section>
        <div className="container">
          {isLoading ? (
            <p>En chargement...</p>
          ) : (
            <>
              <h3 className="subtitle">{data.count} articles</h3>
              <div className="products">
                {/* Boucle sur les offres */}
                {data.offers.map((offer, index) => (
                  // Afficher chacun des produits
                  <div key={offer._id}>
                    <Link
                      // key={offer._id}
                      to={`offer/${offer._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Product
                        offer={offer}
                        onClick={() => handleClick(offer)}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
