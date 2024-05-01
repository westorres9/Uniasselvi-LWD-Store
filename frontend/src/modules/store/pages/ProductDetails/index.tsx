import './styles.css';
import * as productService from '../../../../services/product-service';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../../../types/product';

export default function ProductDetails() {
  const params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(() => {
        navigate("/products");
      });
  }, []);

  return (
    <div className="container">
      <div className="product-details-content">
        {product && <ProductDetailsCard product={product} />}
      </div>
    </div>
  );
}
