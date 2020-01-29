import React, { Component } from 'react';
import { render } from 'react-dom';
import './chatWindow.scss';
import 'bootstrap/dist/css/bootstrap.css';
import socketIOClient from "socket.io-client";

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.userName = "name";
        this.state = {
            endpoint: "localhost:4001",
            message: '',
            name: '',
            allMessages: []
        };
    }

    getTime() {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    render() {
        return (
            <div>
                <span onClick={this.props.onClose}><i className="fas fa-times"></i></span>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">

                        <div className="col-md-8 col-xl-6 chat">
                            <div className="card">
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <div className="img_cont">
                                        <div className="rounded-circle user_img userNameCard">noy</div>
                                            <span className="online_icon"></span>
                                        </div>
                                        <div className="user_info">
                                            <span>Chat</span>
                                            <p>num </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body msg_card_body">

                                    mesegess

                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <textarea name="" className="roundCorner form-control type_msg " placeholder="Type your message..." value={this.state.message}
                                            onChange={this.updateMessage}></textarea>
                                        <div className="input-group-append">
                                            <span onClick={this.send} className="input-group-text send_btn costumSendBtn"><i className="fas fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatWindow;