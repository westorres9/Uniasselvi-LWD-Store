import "./styles.css";
import { useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";
import { TbBrandBootstrap } from "react-icons/tb";
import { TbBrandCarbon } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export default function AdminSidebar() {

  const isMobile = useMediaQuery({ maxWidth: 575 });
  
  const [isOpen, setIsOpen] = useState(false);

  function onClickOpenSideBar() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`admin-sidebar-container ${isOpen ? "is-open" : "is-closed"}`}
    >
      <button onClick={onClickOpenSideBar} disabled={isMobile} className="sidebar-icon-toggle">
        <VscThreeBars width={"25px"} height={"25px"} size={"1x"} />{" "}
      </button>
      <div className="admin-sidebar-content">
        <ul className="admin-sidebar-items">
          <li>
            <Link to="/admin/">
              <div className="sidebar-item">
                <MdDashboard width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Dashboard
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/brands">
              <span className="sidebar-item">
                <TbBrandBootstrap width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Marcas
                </p>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/categories">
              <span className="sidebar-item">
                <TbBrandCarbon width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Categorias
                </p>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <div className="sidebar-item">
                <BiPackage width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Produtos
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <span className="sidebar-item">
                <FaCartShopping width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Pedidos
                </p>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <span className="sidebar-item">
                <HiUsers width={"25px"} height={"25px"} size={"1x"} />
                <p className={`${!isOpen ? "sidebar-item-closed" : ""}`}>
                  Usuários
                </p>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
