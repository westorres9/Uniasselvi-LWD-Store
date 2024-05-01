import "./styles.css";
import { Brand } from "../../../../types/brand";
import { useNavigate } from "react-router-dom";

type Props = {
  brand: Brand;
  onDeleteClick: Function;
};
export default function AdminBrandItem({ brand, onDeleteClick }: Props) {
  const navigate = useNavigate();

  function edit() {
    navigate(`/admin/brands/${brand.id}`);
  }

  function remove(brandId: number) {
    onDeleteClick(brandId);
  }

  return (
    <div className="admin-brand-item-container">
      <div className="admin-brand-item-img">
        <img src={brand.imageUrl} alt="" />
      </div>
      <div className="admin-brand-item-description">
        <h2>{brand.name}</h2>
      </div>
      <div className="admin-brand-item-button-container">
        <button onClick={edit} className="btn btn-outline-secondary">
          Editar
        </button>
        <button
          onClick={() => remove(brand.id)}
          className="btn btn-danger text-white"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
