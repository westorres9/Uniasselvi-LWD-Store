import './styles.css';
import { OrderItem } from "../../../../types/order";

type Props = {
  orderItem: OrderItem
}
export default function ConfirmationItem({ orderItem } : Props ) {
    return (
        <div className="cart-item-container">
          <div className="cart-item-image-container">
            <img src={orderItem.imageUrl} alt="" />
          </div>
          <div className="cart-item-description-container">
            <h4>{orderItem.name}</h4>
            <h2>R$ {orderItem.subTotal.toFixed(2)}</h2>
          </div>
          <div className="cart-quantity-container">
            <div className="confirmation-item-quantity">
            <p>Qtde: {orderItem.quantity}</p>
            </div>
          </div>
        </div>
      );
    }
    