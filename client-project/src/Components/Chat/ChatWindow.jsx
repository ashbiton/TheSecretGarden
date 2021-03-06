import React, { Component } from 'react';
import { render } from 'react-dom';
import './chatWindow.scss';
import 'bootstrap/dist/css/bootstrap.css';
import socketIOClient from "socket.io-client";
import { observer, inject } from "mobx-react";
const { capitilize } = require('../../utils/general_utils');

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.userName = capitilize(props.User.user.name.charAt(0))+capitilize(props.User.user.surname.charAt(0));
        this.state = {
            endpoint: "localhost:5000",
            message: '',
            name: '',
            allMessages: []
        };
        this.updateMessage = this.updateMessage.bind(this);
    }

    componentDidMount = () => {
        document.body.classList.toggle('chat');

        this.setState({ name: this.userName });
        const socket = socketIOClient(this.state.endpoint);

        socket.on('message', (message) => {
            if (message.name !== this.state.name) {
                let arr = this.state.allMessages;
                arr.push(message);
                this.setState({ allMessages: arr });
            }
        })

    }
    componentWillUnmount() {
        document.body.classList.remove('chat')
    }
    updateMessage(e) {
        this.setState({ message: e.target.value });
    }

    render() {
        const socket = socketIOClient(this.state.endpoint);
        return (
            <div>
                <div className="container-fluid h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-md-8 col-xl-6 chat">
                            <div className="popup-box chat-popup" >
                                <div className="card">
                                    
                                    <div className="card-header msg_head">
                                        <div className="d-flex bd-highlight">
                                        <span className="chat-header-button pull-right" onClick={this.props.onClose}><i className="fas fa-times"></i></span>
                                            <div className="img_cont">
                                                <div className="rounded-circle user_img userNameCard">{this.userName}</div>
                                                <span className="online_icon"></span>
                                            </div>
                                            <div className="user_info">
                                                <span>Chat</span>
                                                <p>{this.state.allMessages.length} Messages </p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-body msg_card_body">
                                            {this.renederMessages()}
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
            </div>

        );
    }

    getTime() {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    send = () => {
        let newMessage = {
            type: 'send',
            content: this.state.message,
            name: this.state.name,
            time: this.getTime()
        }
        let arr = this.state.allMessages;
        arr.push(newMessage);
        this.setState({ allMessages: arr });
        this.setState({ message: '' });

        let sendMessage = { ...newMessage };
        sendMessage.type = "recieve";
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('message', sendMessage)

    }

    renederMessages() {
        return this.state.allMessages.map(message => this.getMessage(message));
    }

    getMessage(message) {
        if (message.type == 'send') {

            return <div key={message.time} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer_send">
                    {message.content}
                    <span className="msg_time_send">{message.time}</span>
                </div>
                <div className="img_cont_msg">
                    <div className="rounded-circle user_img_msg littleCircle">{capitilize(this.state.name.charAt(0))}</div>
                </div>
            </div>;
        }

        if (message.type == 'recieve') {

            return <div key={message.time} className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                    <div className="rounded-circle user_img_msg littleCircleStart">{capitilize(message.name.charAt(0))}</div>
                </div>
                <div className="msg_cotainer">
                    {message.content}
                    <span className="msg_time">{message.time}</span>
                </div>
            </div>;
        }
    }

}

export default inject('User')(observer(ChatWindow));