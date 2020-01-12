import React, { Fragment , Component } from 'react';
import "./Structure.scss";
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
class BodyWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <header>
                    <div id="navbar">
                        <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top navbar-default">
                            <a class="navbar-brand">
                                <img src="images/logo/logo-image.png" width="80px" height="40px" alt="" />
                            </a>
                            <div class="ml-auto order-md-last" id="userDiv"></div>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="fas fa-lg"></span></button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <Navbar></Navbar>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
                <div class="bodyWrapper">
                    <main class="pb-5" id="content" role="main">
                        <Main></Main>
                    </main>
                    <Footer></Footer>
                </div>
            </Fragment>);
    }
}

export default BodyWrapper;