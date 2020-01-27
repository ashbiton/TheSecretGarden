import React, { Component } from 'react';
class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <span onClick={this.props.onClose}><i className="fas fa-times"></i></span>
                <div>
                    Chat Window 
                </div>
            </div>
         );
    }
}
 
export default ChatWindow;