import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from './../../App';
import {useContext} from 'react';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.name);
    return (
        <div className="header">
           <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/orders">Order History</Link>
                
                {loggedInUser.email ? 
                
                <button onClick={()=> setLoggedInUser({})}> <span style={{backgroundColor:'yellow'}}>WelCome {loggedInUser.name}</span>  Sign out</button>
                :
                <Link to='/login'>Sign in</Link>
                }
            </nav>
        </div>
    );
};

export default Header;