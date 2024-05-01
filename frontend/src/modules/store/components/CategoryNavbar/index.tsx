import "./styles.css";
import { Link } from "react-router-dom";

export default function CategoryNavbar() {
  return (
    <div className="category-navbar bg-dark navbar-dark">
      <ul className="category-navbar-items">
        <li className="category-navbar-item">
          <Link to="/products">PRODUTOS</Link>
        </li>
        <li className="category-navbar-item">
          <Link to="/categories">CATEGORIAS</Link>
        </li>
        <li className="category-navbar-item">
          <Link to="/brands">FABRICANTES</Link>
        </li>
        <li className="category-navbar-item bp-576">
          <Link to="/sales">PROMOÇÕES</Link>
        </li>
      </ul>
    </div>
  );
}
