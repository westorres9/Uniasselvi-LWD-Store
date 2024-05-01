import { useEffect, useState } from "react";
import ConfirmationItem from "../../components/ConfirmationItem";
import { Order } from "../../../../types/order";
import { useNavigate, useParams } from "react-router-dom";
import * as orderService from '../../../../services/order-service';
import { ToastContainer, toast } from "react-toastify";

export default function Confirmation() {
  
  const params = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>();

  function returnToHome() {
    navigate("/home");
  }

  useEffect(() => {
    orderService.findById(Number(params.orderId)).then(response => {
      setOrder(response.data);
      toastyConfirmationSuccess();
    }).catch(error => {
      toastyConfirmationError();
      console.log(error.response.data)
      setTimeout(() => {
        navigate("/products")
      }, 5000)
    })
  },[params.orderId])

  function toastyConfirmationSuccess() {
    toast.info("Seu pedido foi confirmado!" );
  }

  function toastyConfirmationError() {
    toast.error("Erro ao fazer o pedido");
  }
  
  return (
    <div className="container ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="cart-content-container">
        <h1>Pedido Realizado!</h1>
        <div className="cart-container">
          <div className="cart-items-container">
            {
              order &&
              order.items.map((item) => (
                <ConfirmationItem
                  key={item.productId}
                  orderItem={item}
                />
              ))
            }
          </div>
          {
          order &&
          order.items.length >= 1 && (
            <div className="cart-total-container">
              <h3>Total do Pedido:</h3>
              <br />
              <h1>R$ {order.total.toFixed(2)}</h1>
              <br />
              <h3>Pedido Realizado! Nº: 00{ order.id } </h3>
            </div>
          )}
        </div>
        <div className="cart-buttons">
          <button onClick={returnToHome} className="btn btn-primary btn-return">
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
