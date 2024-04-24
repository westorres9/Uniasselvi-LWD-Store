import "./assets/custom.scss";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./modules/store/pages/Home";
import StoreHome from "./modules/store/pages/StoreHome";
import Catalog from "./modules/store/pages/Catalog";
import ProductDetails from "./modules/store/pages/ProductDetails";
import Cart from "./modules/store/pages/Cart";
import Login from "./modules/store/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<StoreHome />} />
          <Route path="products" element={<Catalog /> }/>
          <Route path="products/:id" element={<ProductDetails/> } />
          <Route path="cart" element={<Cart /> } />
          <Route path="login" element={<Login/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
