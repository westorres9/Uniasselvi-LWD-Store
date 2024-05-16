import './styles.css';
import { useContext, useState } from 'react';
import CartItem from '../../components/CartItem';
import { Order } from '../../../../types/order';
import { useNavigate } from 'react-router-dom';
import { ContextCartCount } from '../../../../utils/context-cart';
import * as cartService from '../../../../services/cart-service';
import * as orderService from '../../../../services/order-service';

export default function Cart() {
  const [cart, setCart] = useState<Order>(cartService.getCart());

  const { setContextCartCount } = useContext(ContextCartCount);

  const navigate = useNavigate();

  function returnToCatalog() {
    navigate("/products");
  }

  function returnToHome() {
    navigate("/");
  }

  function clearCart() {
    cartService.clearCart();
    setCart(cartService.getCart());
    setContextCartCount(cartService.getCart().items.length);
  }

  function handleIncreaseClick(productId: number) {
    cartService.increaseItem(productId);
    const newCart = cartService.getCart();
    setCart(newCart);
  }

  function handleDecreaseClick(productId: number) {
    cartService.decreaseItem(productId);
    const newCart = cartService.getCart();
    setCart(newCart);
    setContextCartCount(cartService.getCart().items.length);
  }

  function handlePlaceOrderClick() {
    orderService.placeOrderRequest(cart).then(response => {
      cartService.clearCart();
      setContextCartCount(0);
      navigate(`/confirmation/${response.data.id}`)
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="container ">
      <div className="cart-content-container">
        <h1>Carrinho de Compras</h1>
        <div className="cart-container">
          <div className="cart-items-container">
            {cart.items.length == 0 ? (
              <h2>Seu Carrinho está vazio</h2>
            ) : (
              cart.items.map((item) => (
                <CartItem
                  key={item.productId}
                  orderItem={item}
                  handleDecreaseClick={handleDecreaseClick}
                  handleIncreaseClick={handleIncreaseClick}
                />
              ))
            )}
          </div>
          {cart.items.length >= 1 && (
            <div className="cart-total-container">
              <h1>Total : R$ {cart.total.toFixed(2)}</h1>
              <button onClick={handlePlaceOrderClick} className="btn btn-dark btn-total">
                FINALIZAR PEDIDO
              </button>
            </div>
          )}
        </div>
        <div className="cart-buttons">
          <button
            onClick={returnToCatalog}
            className="btn btn-outline-dark btn-continue"
          >
            CONTINUAR COMPRANDO
          </button>
          <button
            onClick={clearCart}
            className="btn btn-outline-dark btn-clear"
          >
            LIMPAR CARRINHO
          </button>
          <button onClick={returnToHome} className="btn btn-primary btn-return">
            VOLTAR AO INÍCIO
          </button>
        </div>
      </div>
    </div>
  );
}
