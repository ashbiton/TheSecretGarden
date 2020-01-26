import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
const { addUser , updateUser } = require('../../utils/server_utils');
class AddEditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddedOrChanged: false
        }
    }
    render() {
        const isEditing = this.props.mode == "edit";
        const user = this.props.user;
        const position = this.props.position;
        return (
            <Modal show={this.props.show} onHide={() => { this.props.handleClose(this.state.userAddedOrChanged) }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {
                    /**
                     * here add logic for adding or editing users
                     * 
                     * create a basic form for a all the neccessery positions and according to
                     * the positon passed in props - load the required form/ if is in editing mode pass the user info to the form part
                     * and the form part should take the info from the user and set it as the default value.
                     * if the user in undefined do not set a default value but 
                     */
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddEditUserModal;