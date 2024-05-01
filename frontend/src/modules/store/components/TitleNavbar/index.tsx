import "./styles.css";
import { Link } from "react-router-dom";
import CartIcon from "../CartIcon";
import { MdAdminPanelSettings } from "react-icons/md";
import { useContext } from "react";
import { ContextToken } from "../../../../utils/context-token";
import * as authService from "../../../../services/auth-service";
import LoggedUser from "../LoggedUser";
import Logo from "../../../../assets/images/logo.png";

export default function TitleNavbar() {
  const { contextTokenPayload } = useContext(ContextToken);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="navbar-container container-fluid">
        <Link to="/" className="navbar-brand">
          <div className="logo-container">
            <img src={Logo} alt="" height={60} />
            <h4>LWD Store</h4>
          </div>
        </Link>

        <div className="navbar-items" id="navbarText">
          <Link to="/cart">
            <CartIcon />
          </Link>
          {contextTokenPayload &&
            authService.hasAnyRoles(["ROLE_ADMIN", "ROLE_OPERATOR"]) && (
              <Link to="/admin">
                <div className="cart-icon-container">
                  <MdAdminPanelSettings width={"20px"} height={"20px"} />
                </div>
              </Link>
            )}
          <LoggedUser />
        </div>
      </div>
    </nav>
  );
}
