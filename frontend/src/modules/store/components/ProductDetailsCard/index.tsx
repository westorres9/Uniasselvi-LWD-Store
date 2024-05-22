import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/product";
import { useContext } from "react";
import { ContextCartCount } from "../../../../utils/context-cart";
import * as productService from "../../../../services/cart-service";
import * as cartService from "../../../../services/cart-service";

type Props = {
  product: Product;
};
export default function ProductDetailsCard({ product }: Props) {
  const navigate = useNavigate();

  const { setContextCartCount } = useContext(ContextCartCount);

  function handleBuyClick() {
    if (product) {
      productService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length);
      navigate("/cart");
    }
  }

  return (
    <>
      <div className="product-details-container">
        <div className="product-details-img-container">
          <img src={product.imageUrl} alt="" />
        </div>
        <div className="product-details-price-container">
          <h6 className="text-secondary">{product.name.toUpperCase()}</h6>
          <p className="product-sku">{product.sku}</p>
          {
            product.saleOff && <span className="product-details-standard-price">
            R$ {(product.price + product.price * 0.25).toFixed(2)}
          </span>
          }
          
          <h4 className="text-darkest">R$ {product.price.toFixed(2)}</h4>
          <h6 className="product-parceled">
            Ou 10 x R$ {(product.price / 10).toFixed(2)} SEM JUROS
          </h6>
          {
            product.available ? (         
            <div className="btn-card" onClick={handleBuyClick}>
              <button className="btn-details btn btn-primary">COMPRAR</button>
            </div>
            ) : 
          (
            <div className="btn-card">
              <button className="btn-details btn disabled">PRODUTO NÃO DISPONÍVEL</button>
            </div>
          )
          }
 
        </div>
      </div>
      <div className="product-details-descriptions">
        <h6 className="text-secondary">Descrição</h6>
        <p className="text-secondary">{product.description}</p>
        <h6 className="text-secondary">Specs</h6>
        <p className="text-secondary">{product.specs}</p>
      </div>
    </>
  );
}
