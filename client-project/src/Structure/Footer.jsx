import React, { Component } from 'react';
class Footer extends Component {
    render() {
        return (<footer class="footer py-2">
            <div class="container h-100">
                <div class="row align-items-center h-100">
                    <div class="col-md-auto">
                        <h5 class="text-muted secret text-dark mb-0">The Secret Garden</h5>
                    </div>
                    <div class="col-md-auto ml-auto d-flex justify-content-around">
                        <a class="mr-half" href="https://www.facebook.com">
                            <i class="fab fa-facebook-square fa-3x social" id="social-fb"></i>
                        </a>
                        <a class="mr-half" href="https://twitter.com">
                            <i class="fab fa-twitter-square fa-3x social" id="social-tw"></i>
                        </a>
                        <a class="mr-half" href="https://snapchat.com">
                            <i class="fab fa-snapchat-square fa-3x social" id="social-snap"></i>
                        </a>
                        <a class="mr-half" href="https://pintreset.com">
                            <i class="fab fa-pinterest-square fa-3x social" id="social-pin"></i>
                        </a>
                        <a class="mr-half" href="https://tumblr.com">
                            <i class="fab fa-tumblr-square fa-3x social" id="social-tm"></i>
                        </a></div>
                </div>
            </div>
        </footer>);
    }
}

export default Footer;