import { Link } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/offer">Offer</Link>
          </li>
        </ul>
      </nav>
      <Button title="S'inscrire" />
      <Button title="Se connecter" />
      <Button title="Vends tes articles" />
    </header>
  );
}
