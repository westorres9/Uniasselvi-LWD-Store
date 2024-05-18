import './styles.css';
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

export default function Admin() {
    return (
        <>
            <AdminNavbar/>
            <div className="admin-container">
            <AdminSidebar/>
            <Outlet/>
            </div>
        </>
    )
}