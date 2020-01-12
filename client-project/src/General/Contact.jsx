import React, { Component } from 'react';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 pb-5">
                        <form>
                            <div class="card border-primary rounded-0">
                                <div class="card-header p-0">
                                    <div class="bg-info text-white text-center py-2">
                                        <h3><i class="fa fa-envelope"></i> Contact Us</h3>
                                        <p class="m-0">We will gladly help you</p>
                                    </div>
                                </div>
                                <div class="card-body p-3">
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                            </div><input class="form-control" id="name" type="text" name="name" placeholder="Full name" required="required" /></div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                                            </div><input class="form-control" id="email" type="email" name="email" placeholder="example@gmail.com" required="required" /></div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fa fa-comment text-info"></i></div>
                                            </div><textarea class="form-control" placeholder="Write us your message" required="required"></textarea></div>
                                    </div>
                                    <div class="text-center"><button class="btn btn-info btn-block py-2">Send</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;