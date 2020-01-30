import React, { Component, Fragment } from 'react';
import { observer, inject } from "mobx-react";
import AddEditUserModal from "./AddEditUserModal";
import { Accordion, Card, Button } from 'react-bootstrap';
const { deleteUser } = require('../../utils/server_utils');
class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addEditModalOpen: false,
            modalProps: {}
        }
    }
    getUsers = async () => {
        this.props.Users.getUsers();
    }
    componentDidMount() {
        this.getUsers();
    }

    onRefresh = () => {
        this.getUsers();
    }

    handleOpenModal = (mode, position, _user) => {
        // _user will have data only if in edit mode
        this.setState({
            addEditModalOpen: true,
            modalProps: {
                mode: mode,
                position: position,
                user: _user
            }
        })
    }
    handleCloseModal = (shouldRefresh) => {
        this.setState({
            addEditModalOpen: false,
            modalProps: {}
        }, async () => {
            if (shouldRefresh) {
                console.log("before",this.props.Users.users);
                await this.getUsers();
                console.log("after",this.props.Users.users);

            }
        })
    }
    render() {
        return (
            <div className="container">
                <AddEditUserModal show={this.state.addEditModalOpen} onClose={this.handleCloseModal} {...this.state.modalProps} />

                <div className="container pt-3 pb-5">
                    <ul className="nav nav-pills">
                        <li className="nav-item" id="refreshUsers">
                            <a className="nav-link active" onClick={this.onRefresh}><i className="fa pr-2">&#xf021;</i>Refresh</a>
                        </li>
                    </ul>
                </div>
                <Accordion defaultActiveKey={0}>
                    {
                        this.props.Users.users.map((usersElement, index) => {
                            return <UsersByPosition key={usersElement.position + "table"} index={index} usersData={usersElement} addUser={(...args) => this.handleOpenModal("add", usersElement.position, undefined, ...args)} editUser={(...args) => this.handleOpenModal("edit", ...args)} />
                        }
                        )
                    }
                </Accordion>
            </div>
        );
    }
}

class UsersByPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    deleteUser = (username) => {
        this.props.usersData.deleteUser(username);
    }
    render() {
        let usersData = this.props.usersData;
        return (
            <Card>
                <Card.Header>
                    <div className="container-fluid">
                        <div className="row justify-content-between align-items-center">
                            <h5 className="card-title capitilize">{usersData.positionPlural}</h5>
                            <div className="user-table-links">
                                <button className="btn btn-link" onClick={this.props.addUser} title="Click to add"><i className="fas">&#xf234;</i></button>
                                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.index}><i className="fas fa-angle-down"></i></Accordion.Toggle>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.index}>
                    <Card.Body>
                        {usersData.users.length === 0 ?
                            <div>No {usersData.positionPlural} Found</div>
                            :
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            {
                                                usersData.headers.map((header, index) => {
                                                    return <th className="colored-header capitilize" scope="col" key={usersData.position + header + index}>{header}</th>
                                                })
                                            }
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usersData.users.map((user, index) => {
                                                return <SingleUser key={usersData.position + index + "user"} user={user} headers={usersData.headers} canEdit={usersData.canEdit} editUser={this.props.editUser} deleteUser={this.deleteUser} />
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

class SingleUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.user = this.props.user;
    }
    editUser = () => {
        if (this.props.canEdit) {
            this.props.editUser(this.user.position, this.props.user);
        }
    }
    deleteUser = () => {
        deleteUser(JSON.stringify({ username: this.props.user.username }));
        this.props.deleteUser(this.props.user.username)

    }
    render() {
        return (
            <tr>
                {
                    this.props.headers.map((header, index) =>
                        <td key={header + this.user.position + index}>{this.user[header]}</td>
                    )
                }
                <td>
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex w-100 align-items-center justify-content-around flex-sm-wrap">
                                {
                                    this.props.canEdit &&
                                    <div className="editUser user-icon" onClick={this.editUser} alt="edit user" title="Click to edit this user">
                                        <i className="fas">&#xf4ff;</i>
                                    </div>
                                }

                                <div className="deleteUser user-icon" onClick={this.deleteUser} title="Click to delete this user">
                                    <i className="fas">&#xf235;</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}



export default inject('User', 'Users')(observer(UsersPage));