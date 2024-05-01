/* eslint-disable */

import { useNavigate } from "react-router-dom";
import { Order } from "../../../../types/order";
import "./styles.css";

type Props = {
  order: Order;
};
export default function AdminOrderItem({ order }: Props) {
  const navigate = useNavigate();

  function onEditClick() {
    navigate(`/admin/orders/${order.id}`);
  }

  return (
    <div className="admin-order-item-container">
      <div className="admin-order-item-description">
        <h2>Pedido Nº 00{order.id}</h2>
        <h2>{order.client && order.client.name}</h2>
        <h2>Total R$ {order.total.toFixed(2)}</h2>
        <span
          className={`admin-order-status 
        ${order.status == "PENDENTE" ? "pending" : ""}
        ${order.status == "ENVIADO" ? "send" : ""}
        ${order.status == "ENTREGUE" ? "received" : ""}
        ${order.status == "PAGO" ? "paid" : ""}
        ${order.status == "CANCELADO" ? "canceled" : ""}
        `}
        >
          {order.status}
        </span>
      </div>
      <div className="admin-order-item-button-container">
        <button onClick={onEditClick} className="btn btn-secondary">
          Editar
        </button>
      </div>
    </div>
  );
}
