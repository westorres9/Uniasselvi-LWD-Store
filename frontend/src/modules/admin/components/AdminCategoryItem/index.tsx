import { useNavigate } from "react-router-dom";
import { Category } from "../../../../types/category";
import "./styles.css";

type Props = {
  category: Category;
  onDeleteClick: Function;
};
export default function AdminCategoryItem({ category, onDeleteClick }: Props) {
  const navigate = useNavigate();

  function edit() {
    navigate(`/admin/categories/${category.id}`);
  }

  function remove(categoryId: number) {
    onDeleteClick(categoryId);
  }
  return (
    <div className="admin-category-item-container">
      <div className="admin-category-item-description">
        <h2>{category.name}</h2>
      </div>
      <div className="admin-category-item-button-container">
        <button onClick={edit} className="btn btn-outline-secondary">
          Editar
        </button>
        <button
          onClick={() => remove(category.id)}
          className="btn btn-danger text-white"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
