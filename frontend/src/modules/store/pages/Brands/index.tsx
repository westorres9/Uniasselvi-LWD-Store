import './styles.css';
import { useEffect, useState } from 'react';
import * as brandService from '../../../../services/brand-service';
import { Brand } from '../../../../types/brand';
import BrandCard from '../../components/BrandCard';
import { Link } from 'react-router-dom';

export default function Brands() {

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(()=>{
    brandService.findAll().then(response => {
      console.log(response.data);
      setBrands(response.data);
    })
  },[])
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748237/tool-store-pro/categories/dm5hcvs0tfort4vailcb.png"
        width="100%"
        alt=""
      />
      <div className="container">
        <h1 className='brand-title'>Melhores Marcas</h1>
        <div className="container text-center brand-card-list-container">
          <div className="row brand-grid">
            {brands.map((brand) => (
              <div key={brand.id} className="col-12 col-md-6 col-xl-2">
                <Link to={`/brands/${brand.id}/products`}>
                  <BrandCard brand={brand} />
                </Link>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
