import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
const { register } = require('../../utils/server_utils');
class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.modalId = this.props.modalId;
    }
    onRegister = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        data.forEach((value, key) => {
            console.log("key", key, "value", value);
        });
        let err = await register(Object.fromEntries(data));
        console.log("err?",err);
    }
    render() {
        return (
            <Modal id={this.modalId} show={this.props.active === this.modalId} onHide={() => { this.props.handleClose(this.modalId) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <form className="form" onSubmit={this.onRegister}>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Name</label>
                                <div className="col-md-10">
                                    <input className="form-control capitilize" type="text" name="name" pattern="^[A-Za-z]+$" placeholder="First Name" required="required" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Surname</label>
                                <div className="col-md-10">
                                    <input className="form-control capitilize" type="text" name="surname" pattern="^[A-Za-z]+$" placeholder="Last Name" required="required" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Username</label>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" name="username" required="required" /><small className="form-text text-muted">Username must be 4-10 characters long</small></div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Password</label>
                                <div className="col-md-10">
                                    <input className="form-control" type="password" name="password" pattern="[A-Za-z0-9]{6,12}$" required="required" /><small className="form-text text-muted">Password must include only letters and numbers</small><small className="form-text text-muted">Password must be 6 - 12 characters long</small></div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Email</label>
                                <div className="col-md-10">
                                    <input className="form-control" type="email" name="email" placeholder="example@gmail.com" required="required" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 col-form-label">Phone</label>
                                <div className="col-md-10">
                                    <input className="form-control" type="tel" name="phone" placeholder="0501234567" pattern="05[0-9]{8}" required="required" />
                                </div>
                            </div>
                            <p id="error"></p>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>


        );
    }
}

export default RegisterModal;