import "./styles.css";
import Logo from "../../../../assets/logo.png";
import '@popperjs/core'
import 'bootstrap/js/dist/collapse'
import { NavLink } from "react-router-dom";

export default function StoreNavbar() {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} id="logo" alt="LWD Store" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/products">
              Catálogo
            </NavLink>
            <NavLink className="nav-link" to="/cart">
              Carrinho
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
