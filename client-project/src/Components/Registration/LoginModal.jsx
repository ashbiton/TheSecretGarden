import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
const { login } = require('../../utils/server_utils');
class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: ''
        }
        this.modalId = this.props.modalId;
    }
    onLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        await login(data);
    }
    render() {
        return (
            <Modal id={this.modalId} show={this.props.active === this.modalId} onHide={() => { this.props.handleClose(this.modalId) }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="container my-4 my-md-0 text-center">
                        <div className="row">
                            <div className="col-md vertical-divider">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="colored-header">Login</h5>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <form onSubmit={this.onLogin}>
                                                <div className="form-group">
                                                    <label className="col-form-label sr-only" htmlFor="usernameInput">Username</label>
                                                    <input className="mx-auto form-control" id="usernameInput" type="text" name="username" placeholder="Username" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label sr-only" htmlFor="passwordInput">Password</label>
                                                    <input className="mx-auto form-control" id="passwordInput" type="password" name="password" placeholder="Password" />
                                                </div>
                                                <button className="btn btn-primary" id="loginBtn" type="submit">Login</button>
                                            </form>
                                            <p id="error"></p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col"><button className="btn btn-link capitilize" id="forgotBtn" type="button" onClick={this.props.onForgotPassword}>forgot your password?</button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md mt-md-5">
                                <h6 className="capitilize colored-header">first time around ?</h6><button className="btn btn-primary mt-3" id="signInBtn" onClick={this.props.onRegister}>Create an account</button></div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;