import { Category } from "../../../../types/category";
import "./styles.css";

type Props = {
  category: Category;
};
export default function CategoryCard({ category }: Props) {
  return (
    <div className="category-card-container">
      <div className="category-card-img">
        <img src={category.imageUrl} alt="" />
      </div>
      <div className="category-card-name">
        <h2>{category.name}</h2>
      </div>
    </div>
  );
}
