import "./styles.css";
import { useParams } from "react-router-dom";
import * as productService from "../../../../services/product-service";
import { useEffect, useState } from "react";
import { Product } from "../../../../types/product";
import ProductCard from "../../components/ProductCard";

export default function ProductsByBrand() {
  const params = useParams();

  const [isEmpty, setIsEmpty] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService
      .findProductsByBrand(Number(params.brandId))
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
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748237/tool-store-pro/categories/dm5hcvs0tfort4vailcb.png"
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
          {isEmpty && <h2>Nenhum produto encontrado para esta Marca!</h2>}
        </div>
      </div>
    </div>
  );
}
