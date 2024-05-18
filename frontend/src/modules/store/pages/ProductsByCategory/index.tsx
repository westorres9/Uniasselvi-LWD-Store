import "./styles.css";
import { useParams } from "react-router-dom";
import * as productService from "../../../../services/product-service";
import { useEffect, useState } from "react";
import { Product } from "../../../../types/product";
import ProductCard from "../../components/ProductCard";

export default function ProductsByCategory() {
  const params = useParams();

  const [isEmpty, setIsEmpty] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService
      .findProductsByCategory(Number(params.categoryId))
      .then((response) => {
        setProducts(response.data);
        products.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748238/tool-store-pro/categories/pag2ydwvypo5txnduktc.png"
        width="100%"
        alt=""
      />
      <div className="container">
        <div className="row category-products-container">
          {products.map((product) => (
            <div key={product.id} className="col-item col-12 col-md-6 col-xl-3">
              <ProductCard product={product} />
            </div>
          ))}
          {isEmpty && <h2>Nenhum produto encontrado nesta categoria!</h2>}
        </div>
      </div>
    </div>
  );
}
