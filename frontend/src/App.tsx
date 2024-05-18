import './assets/custom.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ContextCartCount } from './utils/context-cart';
import { AccessTokenPayload } from './types/auth';
import { ContextToken } from './utils/context-token';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import Home from './modules/store/pages/Home';
import StoreHome from './modules/store/pages/StoreHome';
import Products from './modules/store/pages/Products';
import Categories from './modules/store/pages/Categories';
import Cart from './modules/store/pages/Cart';
import Login from './modules/store/pages/Login';
import Confirmation from './modules/store/pages/Confirmation';
import Brands from './modules/store/pages/Brands';
import AdminBrands from './modules/admin/pages/AdminBrands';
import Sales from './modules/store/pages/Sales';
import ProductDetails from './modules/store/pages/ProductDetails';
import Recover from './modules/store/pages/Recover';
import Register from './modules/store/pages/Register';
import AdminHome from './modules/admin/pages/AdminHome';
import Admin from './modules/admin/pages/Admin';
import PrivateRoute from './modules/store/components/PrivateRoute';
import AdminCategories from './modules/admin/pages/AdminCategories';
import AdminProducts from './modules/admin/pages/AdminProducts';
import AdminOrders from './modules/admin/pages/AdminOrders';
import AdminUsers from './modules/admin/pages/AdminUsers';
import AdminBrand from './modules/admin/pages/AdminBrand';
import AdminCategory from './modules/admin/pages/AdminCategory';
import AdminProduct from './modules/admin/pages/AdminProduct';
import AdminOrder from './modules/admin/pages/AdminOrder';
import AdminUser from './modules/admin/pages/AdminUser';
import * as cartService from './services/cart-service';
import * as authService from './services/auth-service';
import ProductsByCategory from './modules/store/pages/ProductsByCategory';
import ProductsByBrand from './modules/store/pages/ProductsByBrand';

function App() {

  const cart = cartService.getCart();

  const [contextCartCount, setContextCartCount] = useState<number>(cart.items.length);

  const [contextTokenPayload, setContextTokenPayload] = useState<
    AccessTokenPayload
  >();

  useEffect(() => {
    if(authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  },[])

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={ <Home/> }>
              <Route index element={ <StoreHome/> }/>
              <Route path="products" element={ <Products/>}/>
              <Route path="categories" element={ <Categories/>}/>
              <Route path="categories/:categoryId/products" element={ <ProductsByCategory/>}/>
              <Route path="brands/:brandId/products" element={ <ProductsByBrand/> }/>
              <Route path="brands" element={ <Brands/> }/>
              <Route path="sales" element={ <Sales/> }/>
              <Route path="product-details/:productId" element={ <ProductDetails/> }/>
              <Route path="cart" element={ <Cart/> }/>
              <Route path="login" element={ <Login/> }/>
              <Route path="recover" element={ <Recover/> }/>
              <Route path="register" element={ <Register/> }/>
              <Route path="confirmation/:orderId" element={ <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_OPERATOR','ROLE_CLIENT']}><Confirmation /></PrivateRoute>} />
            </Route>
            <Route path="/admin/" element={ 
              <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_OPERATOR']}>
                  <Admin/>
              </PrivateRoute> 
            }>
              <Route index element={ <AdminHome/> }/>
              <Route path="brands" element={ <AdminBrands/> }/>
              <Route path="brands/:brandId" element={ <AdminBrand /> }/>
              <Route path="categories" element={ <AdminCategories/> }/>
              <Route path="categories/:categoryId" element={ <AdminCategory/> }/>
              <Route path="products" element={ <AdminProducts/> }/>
              <Route path="products/:productId" element={ <AdminProduct/> }/>
              <Route path="orders" element={ <AdminOrders/> }/>
              <Route path="orders/:orderId" element={ <AdminOrder/> }/>
              <Route path="users" element={ <AdminUsers/> }/>
              <Route path="users/:userId" element={ <AdminUser /> }/>
            </Route>
            <Route path="*" element={ <Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}

export default App;
