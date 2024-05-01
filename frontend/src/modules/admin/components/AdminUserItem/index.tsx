import './styles.css';
import { User } from '../../../../types/user';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../../../assets/images/user-icon.png';

type Props = {
    user: User,
    onDeleteClick: Function
}
export default function AdminUserItem({ user ,onDeleteClick  } : Props ) {
    const navigate = useNavigate();

    function edit() {
        navigate(`/admin/users/${user.id}`);
    }

    function remove(brandId: number) {
        onDeleteClick(brandId)
    }

    return (
        <div className="admin-user-item-container">
            <div className="admin-user-item-img">
                <img src={UserIcon} alt="" />
            </div>
            <div className="admin-user-item-description">
            <h2>{ user.firstName + " " + user.lastName}</h2>
            <h2>{ user.email }</h2>
            </div>
            <div className="admin-user-item-button-container">
                <button onClick={edit} className='btn btn-outline-secondary'>Editar</button>
                <button onClick={() => remove(user.id)} className='btn btn-danger text-white'>Excluir</button>
            </div>
        </div>
    )
}