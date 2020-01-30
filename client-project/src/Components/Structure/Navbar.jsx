import React, { Fragment, Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const user = this.props.User.user;
        return (
            <Fragment>
                <li className="nav-item" id="contact"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                <li className="nav-item" id="about"><Link className="nav-link" to="/about">About</Link></li>
                {!user && <li className="nav-item" id="login" onClick={() => { this.props.triggerLogin(true) }}><a className="nav-link">Login</a></li>}
                {user && <li className="nav-item" id="catalog"><Link className="nav-link" to="/catalog">Catalog</Link></li>}
                {user && (user.position === "manager") && <li className="nav-item" id="manage-branches"><Link className="nav-link" to="/branches">Branches</Link></li>}
                {user && (user.position == "manager" || user.position === "employee") && <li className="nav-item" id="manage-users"><Link className="nav-link" to="/users">Users</Link></li>}
                {user && <li className="nav-item" id="logout" onClick={()=>{this.props.User.logOut(); }}><a href="/" className="nav-link">Log Out</a></li>}
        {user && <li className="nav-item" id="cart"><Link className="nav-link" to="/cart"><i className="fas fa-shopping-bag"></i><span id="total-items-in-cart" className="rounded-circle pl-1 font-weight-bold">{this.props.ShoppingCart.totalItems}</span></Link></li>}

            </Fragment>
        );
    }
}

export default inject('User', 'ShoppingCart')(observer(Navbar));