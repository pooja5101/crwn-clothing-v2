import { Fragment } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import './navigation.styles.scss';

const Navigation = () => {

    return (
        <Fragment>
            <div>
                <Logo/>
            </div>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;