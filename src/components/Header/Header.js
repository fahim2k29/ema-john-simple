import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from './../../App';
import {useContext} from 'react';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
           <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Inventory</Link>
                <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;