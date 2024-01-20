import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
  return isLoading ? (
    <p>En chargement...</p>
  ) : (
    <main>
      {data.offers.map((offer) => (
        <article key={offer._id}>
          <div>
            {console.log(offer.owner.account.avatar.secure_url)}
            <img
              src={offer.owner.account.avatar.secure_url}
              alt="avatar"
            />{" "}
            {offer.owner.account.username}
          </div>
        </article>
      ))}
    </main>
  );
}
