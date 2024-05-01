import "./styles.css";
import { OrderItem } from "../../../../types/order";

type Props = {
  orderItem: OrderItem;
  handleIncreaseClick: Function;
  handleDecreaseClick: Function;
};
export default function CartItem({
  orderItem,
  handleIncreaseClick,
  handleDecreaseClick,
}: Props) {
  function handleIncreaseItem(productId: number) {
    handleIncreaseClick(productId);
  }

  function handleDecreaseItem(productId: number) {
    handleDecreaseClick(productId);
  }

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
        <div onClick={() => handleDecreaseItem(orderItem.productId)}>
          <span className="cart-item-increase bg-primary text-dark">-</span>
        </div>
        <div className="cart-item-quantity base-input form-control">
          {orderItem.quantity}
        </div>
        <div>
          <span
            onClick={() => handleIncreaseItem(orderItem.productId)}
            className="cart-item-decrease bg-primary text-dark"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
