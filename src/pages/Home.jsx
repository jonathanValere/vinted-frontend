import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import Banner from "../components/Banner";

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
      console.log(response.data);
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
            <div className="products">
              {/* Boucle sur les offres */}
              {data.offers.map((offer) => (
                // Afficher chacun des produits
                <Product offer={offer} key={offer._id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
