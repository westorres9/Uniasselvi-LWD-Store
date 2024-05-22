import "./styles.css";
import { Product } from "../../../../types/product";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/product-details/${ product.id }`}>
      <div className="product-card-container">
        <div className="product-img-container">
          <img src={ product.imageUrl } alt="" />
          <div className="sale-off-container">
            {
              product.saleOff && <span className="safe-off">OFERTA</span>
            }
            {
              !product.available && <span className="unavailable">ESGOTADO</span>
            }
          </div>
        </div>
        <div className="product-description-container">
          <h5 className="text-secondary">{ product.name }</h5>
          <div className="product-price-container">
          {
            product.saleOff && <span className="standard-price">R$ {(product.price + (product.price * 0.25)).toFixed(2)}</span>
          }
          <h4 className="text-darkest">R$ { product.price.toFixed(2) }</h4>
          </div>
          <p>Ou 10 x R$ {( product.price / 10).toFixed(2) } sem juros</p>
          <div className="btn-card">
            <button className="btn btn-primary">VER MAIS</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
