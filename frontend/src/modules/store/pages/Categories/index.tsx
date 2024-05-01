import "./styles.css";
import CategoryCard from "../../components/CategoryCard";
import * as categorySevice from "../../../../services/category-service";
import { useEffect, useState } from "react";
import { Category } from "../../../../types/category";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categorySevice.findAll().then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
  }, []);
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748238/tool-store-pro/categories/pag2ydwvypo5txnduktc.png"
        width="100%"
        alt=""
      />
      <div className="container">
        <h1 className="category-title">Categorias</h1>
        <div className="container text-center category-card-list-container">
          <div className="row category-grid">
            {categories.map((cat) => (
              
                <div key={cat.id} className="col-12 col-lg-6">
                  <Link to={`/categories/${cat.id}/products`}>
                    <CategoryCard category={cat} />
                  </Link>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
