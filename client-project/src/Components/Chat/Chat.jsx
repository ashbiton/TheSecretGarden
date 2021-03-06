import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import './Chat.scss';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChatOpen: false
        }
    }
    onClickToOpen = () => {
        this.setState({ isChatOpen: true })
    }

    onClickToClose = () => {
        this.setState({ isChatOpen: false })
    }
    render() {
        let compToRender = <ChatWidget onOpen={this.onClickToOpen} />;
        if (this.state.isChatOpen) {
            compToRender = <ChatWindow onClose={this.onClickToClose} />
        }

        return (
            <div id="customer-service-chat">
                {compToRender}
            </div>
        )
    }
}

class ChatWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="round hollow text-center">
                <a href="#" onClick={this.props.onOpen}><i className="far fa-comment"></i> </a>
            </div>
         );
    }
}

export default Chat;