import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <li className="nav-item" id="contact"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                <li className="nav-item" id="about"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item" id="login" onClick={()=>{this.props.triggerLogin(true)}}><a className="nav-link">Login</a></li>
                <li className="nav-item" id="catalog"><Link className="nav-link" to="/catalog">Catalog</Link></li>
                <li className="nav-item" id="manage-branches"><Link className="nav-link" to="/branches">Branches</Link></li>
                <li className="nav-item" id="manage-users"><Link className="nav-link" to="/users">Users</Link></li>
                <li className="nav-item" id="logout"><a className="nav-link">Log Out</a></li>
                
            </Fragment>
        );
    }
}

export default Navbar;