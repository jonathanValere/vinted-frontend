import styles from "./Publish.module.css";
import { Navigate } from "react-router-dom";

export default function Publish({ token }) {
  return token ? (
    <section className={styles["publish-section"]}>
      <div className="container">
        <h1 className={styles["publish-title"]}>Vends ton article</h1>
        <form action="" className={styles["publish-form"]}>
          <label htmlFor="file">
            <input type="file" name="file" id="file" />
          </label>
          <label htmlFor="title">
            Titre
            <input type="text" name="title" id="title" />
          </label>
          <label htmlFor="description">
            Décris ton article
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <label htmlFor="marque">
            Marque
            <input type="text" name="marque" id="marque" />
          </label>
          <label htmlFor="taille">
            Taille
            <input type="text" name="taille" id="taille" />
          </label>
          <label htmlFor="color">
            Couleur
            <input type="text" name="color" id="color" />
          </label>
          <label htmlFor="etat">
            Etat
            <input type="text" name="etat" id="etat" />
          </label>
          <label htmlFor="lieu">
            Lieu
            <input type="text" name="lieu" id="lieu" />
          </label>
          <label htmlFor="prix">
            Prix
            <input type="text" name="prix" id="prix" />
          </label>
          <label htmlFor="">
            <input type="checkbox" name="" id="" />
            Je suis intéressé(e) par les échanges
          </label>
          <button>Ajouter</button>
        </form>
      </div>
    </section>
  ) : (
    <Navigate to="/login" />
  );
}
