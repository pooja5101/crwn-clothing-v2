import { Fragment } from "react";

const Navigation = () => {

    return (
        <Fragment>
            <div>Logo</div>
            <div className="link-container">
                <link to='/shop'>
                    SHOP
                </link>
            </div>
        </Fragment>
    );
}

export default Navigation;