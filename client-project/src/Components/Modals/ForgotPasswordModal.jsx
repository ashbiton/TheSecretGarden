import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
class ForgotPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.modalId = this.props.modalId;
    }
    render() {
        return (
            <Modal id={this.modalId} show={this.props.active === this.modalId} onHide={()=>{this.props.handleClose(this.modalId)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form>
                            <div className="form-group"><label className="capitilize" htmlFor="#forgotEmail">please enter the mail address to send reset mail</label><input className="form-control" id="forgotEmail" type="email" field="email" placeholder="example@gmail.com" required="required" /></div>
                            <p id="error"></p><button className="btn btn-primary" id="forgotSubmitBtn" type="submit">Reset Password</button></form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ForgotPasswordModal;