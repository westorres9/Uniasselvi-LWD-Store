import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { ContextCartCount } from "../../../../utils/context-cart";

export default function CartIcon() {
  const { contextCartCount } = useContext(ContextCartCount);

  return (
    <div className="cart-icon-container">
      <FaShoppingCart width={"25px"} height={"25px"} size={"1x"} />
      {contextCartCount > 0 && (
        <div className="cart-notification bg-white text-dark">
          {contextCartCount}
        </div>
      )}
    </div>
  );
}
