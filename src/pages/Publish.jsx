import styles from "./Publish.module.css";
import axios from "axios";

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
          <label htmlFor="file">
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <label htmlFor="title">
            Titre
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Décris ton article
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <label htmlFor="condition">
            Condition
            <input
              type="text"
              name="condition"
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
          <label htmlFor="brand">
            Marque
            <input
              type="text"
              name="brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label htmlFor="size">
            Taille
            <input
              type="text"
              name="size"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <label htmlFor="color">
            Couleur
            <input
              type="text"
              name="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>

          <label htmlFor="city">
            Lieu
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label htmlFor="price">
            Prix
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label htmlFor="isChange">
            <input
              type="checkbox"
              name="isChange"
              id="isChange"
              onChange={() => setIsInterestingToChange(!isInterestingToChange)}
            />
            Je suis intéressé(e) par les échanges
          </label>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
}
