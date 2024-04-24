import { Outlet } from "react-router-dom";
import StoreNavbar from "../../components/StoreNavbar";

export default function Home() {
  return (
    <>
      <StoreNavbar />
      <Outlet />
    </>
  );
}
