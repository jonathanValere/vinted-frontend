import Product from "../components/Product";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

export default function Home({ data, loading }) {
  return (
    <>
      <section>
        <Banner />
      </section>

      <section>
        <div className="container">
          {loading ? (
            <p>En chargement...</p>
          ) : (
            <div className="products">
              {/* Boucle sur les offres */}
              {data.offers.map((offer) => (
                // Afficher chacun des produits
                <Link
                  key={offer._id}
                  to={`offer/${offer._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Product offer={offer} onClick={() => handleClick(offer)} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
