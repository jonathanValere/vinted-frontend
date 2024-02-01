import styles from "./Publish.module.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Publish({ token }) {
  const navigate = useNavigate();
  const urlPublish =
    "https://site--backend-vinted--lkcrzmx4xyh5.code.run/offer/publish";
  //Déclaration des states ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState({});
  const [isInterestingToChange, setIsInterestingToChange] = useState(false);

  // Gestion du formulaire ----------
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Instanciation d'un objet formData et ajout des données
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", file);
    formData.append("change", isInterestingToChange);

    try {
      //requête publication de l'article
      const { data } = await axios.post(urlPublish, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Afficher la page de l'article
      navigate(`/offer/${data._id}`);
    } catch (error) {
      if (err.data.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.data.msg);
      }
    }
  };

  //   --------------
  return token ? (
    <section className={styles["publish-section"]}>
      <div className="container">
        <h1 className={styles["publish-title"]}>Vends ton article</h1>
        <form
          action=""
          className={styles["publish-form"]}
          onSubmit={handleSubmit}
        >
          <div className={styles["publish-form-part"]}>
            <div id={styles.files}>
              <label htmlFor="file">
                <p id={styles["file-button"]}>
                  <FontAwesomeIcon icon="plus" /> Ajoute une photo
                </p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className={styles["publish-form-part"]}>
            <div className={styles.champs}>
              <label htmlFor="title">Titre</label>
              <input
                placeholder="ex : Chemise Sézane verte"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                placeholder="ex : Porté quelques fois, taille correctement"
                name="description"
                id="description"
                cols="30"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles["publish-form-part"]}>
            <div>
              <label htmlFor="brand">Marque</label>
              <input
                placeholder="ex : Zara"
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="size">Taille</label>
              <input
                placeholder="ex : L / 40 / 12"
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="color">Couleur</label>
              <input
                placeholder="ex : Vert"
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="condition">Etat</label>
              <input
                placeholder="ex : Neuf avec étiquette"
                type="text"
                name="condition"
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city">Lieu</label>
              <input
                placeholder="ex : Cayenne"
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className={styles["publish-form-part"]}>
            <div>
              <label htmlFor="price">Prix</label>
              <input
                placeholder="0.00 €"
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label id={styles.isChange} htmlFor="isChange">
                <input
                  type="checkbox"
                  name="isChange"
                  id="isChange"
                  onChange={() =>
                    setIsInterestingToChange(!isInterestingToChange)
                  }
                />
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
}
