import React, { Fragment, Component } from 'react';
import "./Structure.scss";
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
import RegistrationModals from '../Registration/RegistrationModals';
class BodyWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalOpen: false
        }
    }

    triggerLogin = (shouldBeOpen) => {
        this.setState({ loginModalOpen: shouldBeOpen })
    }
    render() {
        return (
            <Fragment>
                <RegistrationModals triggerLogin={this.triggerLogin} isLoginOpen={this.state.loginModalOpen} />
                <div className="bodyWrapper">
                    <header>
                        <div id="navbar">
                            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top navbar-default">
                                <a className="navbar-brand">
                                    <img src="images/logo/logo-image.png" width="80px" height="40px" alt="" />
                                </a>
                                <div className="ml-auto order-md-last" id="userDiv"></div>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span className="fas fa-lg"></span></button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <Navbar triggerLogin={this.triggerLogin}></Navbar>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <main className="pb-5" id="content" role="main">
                        <Main></Main>
                    </main>
                    <Footer></Footer>
                </div>

            </Fragment>);
    }
}

export default BodyWrapper;