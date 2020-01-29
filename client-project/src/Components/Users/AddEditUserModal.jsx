import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import FormByPosition from "../PositionsForms/FormByPosition";
const { addUser, updateUser } = require('../../utils/server_utils');
class AddEditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddedOrChanged: false
        }
    }
    onFormSubmitted = async (e) => {
        let error = undefined;
        e.preventDefault();
        if (this.props.mode == "edit") {
            const data = this.collectUserDataEditMode(e);
            error = await updateUser(data);
        }
        else {
            const data = this.collectUserDataAddMode(e);
            error = await addUser(data);
        }
        if (!error) {
            this.setState({ userAddedOrChanged: true }, () => {
                this.props.onClose(true);
            });
        }
        else {
            //handle error case
        }
    }
    render() {
        const user = this.props.user;
        const position = this.props.position;
        return (
            <Modal show={this.props.show} onHide={() => { this.props.onClose(this.state.userAddedOrChanged) }}>
                <Modal.Header closeButton>
                    <div className="capitilize">{this.props.mode} {position}</div>
                </Modal.Header>
                <Modal.Body>
                    <form className="form" onSubmit={this.onFormSubmitted}>
                        <FormByPosition position={position} data={user} />
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }

    collectUserDataEditMode = (e) => {
        const data = new FormData(e.currentTarget);
        if (!data.position) {
            data.position = this.props.position;
        }
        data.forEach((value, key) => {
            console.log("key", key, "value", value);
        });
        return JSON.stringify(Object.fromEntries(data));
    }

    collectUserDataAddMode = (e) => {
        const data = new FormData(e.currentTarget);
        if (!data.position) {
            data.set("position", this.props.position);
        }
        data.forEach((value, key) => {
            console.log("key", key, "value", value);
        });
        return JSON.stringify(Object.fromEntries(data));
    }
}

export default AddEditUserModal;