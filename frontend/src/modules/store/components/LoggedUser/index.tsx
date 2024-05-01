import './styles.css';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useContext } from 'react';
import { ContextToken } from '../../../../utils/context-token';
import * as authService from '../../../../services/auth-service';

export default function LoggedUser() {

    const { contextTokenPayload,setContextTokenPayload } = useContext(ContextToken);

    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(authService.getAccessTokenPayload());
    }
    return (
        contextTokenPayload && authService.isAuthenticated() ?
        (
            <div className="logged-user-container">
                <p>{ contextTokenPayload.username }</p>
                <span onClick={handleLogoutClick}>Sair</span>
            </div>
        ):(
            <Link to="/login">
            <div className="cart-icon-container">
              <FaUser width={'20px'} height={'20px'} size={'1x'} />
            </div>
          </Link>
        )
    )
}