import React, { Component } from 'react';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 pb-5">
                        <form>
                            <div className="card border-primary rounded-0">
                                <div className="card-header p-0">
                                    <div className="bg-info text-white text-center py-2">
                                        <h3><i className="fa fa-envelope"></i> Contact Us</h3>
                                        <p className="m-0">We will gladly help you</p>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                            </div><input className="form-control" id="name" type="text" name="name" placeholder="Full name" required="required" /></div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                            </div><input className="form-control" id="email" type="email" name="email" placeholder="example@gmail.com" required="required" /></div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-comment text-info"></i></div>
                                            </div><textarea className="form-control" placeholder="Write us your message" required="required"></textarea></div>
                                    </div>
                                    <div className="text-center"><button className="btn btn-info btn-block py-2">Send</button></div>
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