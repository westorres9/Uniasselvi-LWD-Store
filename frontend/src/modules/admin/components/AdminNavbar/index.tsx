import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import * as userService from "../../../../services/user-service";
import * as authService from "../../../../services/auth-service";
import { User } from "../../../../types/user";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../../utils/context-token";

export default function AdminNavbar() {
  
  const navigate = useNavigate();

  const { setContextTokenPayload } = useContext(ContextToken);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    userService.getLoggedUser().then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);

  function returnToHome() {
    navigate("/");
  }

  function logout() {
    authService.logout();
    setContextTokenPayload(authService.getAccessTokenPayload());
  }

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-container container">
        <h4>LWD Store Admin</h4>
        <div className="admin-navbar-logged-user">
          <p>{user?.email}</p>
          <div className="admin-navbar-logged-user-container">
            <div onClick={returnToHome} className="admin-navbar-icon">
              <IoHomeSharp width={"25px"} height={"25px"} size={"1x"} />
            </div>
            <span onClick={logout}>Sair</span>
          </div>
        </div>
      </div>
    </div>
  );
}
