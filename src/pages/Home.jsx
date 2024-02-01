import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Product from "../components/Product";
import Banner from "../components/Banner";

export default function Home({ data, setData, url }) {
  //Déclaration des states ---
  const [isLoading, setIsLoading] = useState(true);
  // Pour test ---
  // const backLeReacteur = "https://lereacteur-vinted-api.herokuapp.com/offers";
  //  ---

  // Gestion du useEffect ----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data.offers);
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
              <div className="products">
                {/* Boucle sur les offres */}
                {data.map((offer) => (
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
