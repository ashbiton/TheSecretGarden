import React, { Component } from 'react';
class Footer extends Component {
    render() {
        return (<footer className="footer py-2">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-auto">
                        <h5 className="text-muted secret text-dark mb-0">The Secret Garden</h5>
                    </div>
                    <div className="col-md-auto ml-auto d-flex justify-content-around">
                        <a className="mr-half" href="https://www.facebook.com">
                            <i className="fab fa-facebook-square fa-3x social" id="social-fb"></i>
                        </a>
                        <a className="mr-half" href="https://twitter.com">
                            <i className="fab fa-twitter-square fa-3x social" id="social-tw"></i>
                        </a>
                        <a className="mr-half" href="https://snapchat.com">
                            <i className="fab fa-snapchat-square fa-3x social" id="social-snap"></i>
                        </a>
                        <a className="mr-half" href="https://pintreset.com">
                            <i className="fab fa-pinterest-square fa-3x social" id="social-pin"></i>
                        </a>
                        <a className="mr-half" href="https://tumblr.com">
                            <i className="fab fa-tumblr-square fa-3x social" id="social-tm"></i>
                        </a></div>
                </div>
            </div>
        </footer>);
    }
}

export default Footer;