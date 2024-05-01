import './styles.css';
import { Product } from '../../../../types/product';
import { useNavigate } from 'react-router-dom';

type Props = {
    product: Product,
    onDeleteClick: Function
}
export default function AdminProductItem({ product, onDeleteClick } : Props ) {

    const navigate = useNavigate();

    function edit() {
        navigate(`/admin/products/${product.id}`)
    }

    return (
        <div className='admin-product-item-container'>
            <div className='admin-product-item-img'>
                <img src={ product.imageUrl } alt="" />
            </div>
            <div className='admin-product-item-div'>
                <div className='admin-product-item-description'>
                    <h2>{ product.name }</h2>
                    <h4 className='admin-product-item-price'>R$ { product.price.toFixed(2) }</h4>
                    <p className='product-category-flag'>{ product.category.name }</p>
                </div>
                <div className='admin-product-item-button-container'>
                    <button onClick={ edit } className='btn btn-outline-secondary'>Editar</button>
                    <button onClick={ () => onDeleteClick(product.id) } className='btn btn-danger text-white'>Excluir</button>
                </div>
            </div>
        </div>
    )
}