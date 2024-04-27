import { Outlet } from "react-router-dom";
import StoreNavbar from "../../components/StoreNavbar";
import PayWithPix from "../../components/PayWithPix";

export default function Home() {
  return (
    <>
      <PayWithPix />
      <StoreNavbar />
      <Outlet />
    </>
  );
}
