import React, { Fragment, Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <li class="nav-item" id="contact"><a class="nav-link">Contact Us</a></li>
                <li class="nav-item" id="about"><a class="nav-link">About</a></li>
                <li class="nav-item" id="login" data-toggle="modal" data-target="#loginModal"><a class="nav-link">Login</a></li>
                <li class="nav-item" id="catalog"><a class="nav-link">Catalog</a></li>
                <li class="nav-item" id="manage-branches"><a class="nav-link">Branches</a></li>
                <li class="nav-item" id="manage-users"><a class="nav-link">Users</a></li>
                <li class="nav-item" id="logout"><a class="nav-link">Log Out</a></li>
            </Fragment>
        );
    }
}

export default Navbar;