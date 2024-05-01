import "./styles.css";
import { Product } from "../../../../types/product";
import ProductCard from "../ProductCard";
import * as productService from '../../../../services/product-service';
import { useEffect, useState } from "react";

type Props = {
  title: string;
  id: number;
};

export default function Highligths({ title, id }: Props) {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() =>{
    productService.findProductsHighlight(id).then(response => {
      console.log(title, response.data);
      setProducts(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])
  
  return (
    <div className="highligths-content">
      <div className="container highligths-container">
        <div className="highlights-title">
          <h1>{title}</h1>
        </div>
        <div className="container text-center">
          <div className="row">
            {
              products.map(product => (
                <div key={product.id} className="col-item col-12 col-md-6 col-xl-3">
                  <ProductCard product={product} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
