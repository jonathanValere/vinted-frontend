import axios from "axios";
import Cookies from "js-cookie";

import styles from "./Login.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setToken, setVisible }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const urlOwn =
    "https://site--backend-vinted--lkcrzmx4xyh5.code.run/user/login";

  const handleChangeGeneric = (event, field) => {
    const copyUser = { ...user };

    copyUser[field] = event.target.value;

    setUser(copyUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(urlOwn, user);
      Cookies.set("userToken", response.data.token, {
        secure: true,
        expires: 1,
      });
      setToken(Cookies.get("userToken"));
      return navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      return setError(message);
    }
  };

  return (
    <section className={styles["section-login"]}>
      <div className="container">
        <div className={styles["form-container"]}>
          <h1>Se connecter</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="">
              <input
                type="email"
                value={user.email}
                placeholder="Adresse email"
                onChange={(event) => handleChangeGeneric(event, "email")}
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                value={user.password}
                placeholder="Mot de passe"
                onChange={(event) => handleChangeGeneric(event, "password")}
              />
            </label>
            <button>Se connecter</button>
            <p id={styles["btn-go-signup"]} onClick={() => setVisible(true)}>
              Tu n'as pas encore de compte ? Inscris-toi !
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
