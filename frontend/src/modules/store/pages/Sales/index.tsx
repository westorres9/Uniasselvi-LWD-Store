import { useEffect, useState } from "react";
import { Product } from "../../../../types/product";
import * as productService from "../../../../services/product-service";
import ProductCard from "../../components/ProductCard";

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    productService
      .findProductsOnSaleOff()
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
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748238/tool-store-pro/categories/zfdq27mmskqqilq6l82k.png"
        width="100%"
        alt=""
      />
      <div className="container">
      <h1 className="category-title">Produtos em Promoção</h1>
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
