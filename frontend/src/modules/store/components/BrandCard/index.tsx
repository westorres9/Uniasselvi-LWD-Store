import './styles.css';
import { Brand } from "../../../../types/brand"

type Props = {
    brand: Brand
}
export default function BrandCard({ brand } : Props ) {
    return (
        <div className='brand-card-container'>
            <div className='brand-card-img'>
                <img src={ brand.imageUrl } alt="" />
            </div>
        </div>
    )
}