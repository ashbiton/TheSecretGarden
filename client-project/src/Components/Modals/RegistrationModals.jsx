import React, { Component, Fragment } from 'react';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import ForgotPasswordModal from '../Modals/ForgotPasswordModal';
class RegistrationModals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeModal: this.props.isLoginOpen? 'loginModal':''
        }
        this.modals = {
            REGISTER: "registerModal",
            FORGOT_PASSWORD: "forgotPasswordModal",
            LOGIN: "loginModal"
        }
    }
    componentDidUpdate(){
        if(this.props.isLoginOpen && this.state.activeModal !== this.modals.LOGIN){
            this.setState({activeModal: this.modals.LOGIN});
        }
    }

    handleModalClose = (modalId) => {
        if (modalId === this.state.activeModal){
            this.setState({activeModal: ''});
        }
        if (modalId === this.modals.LOGIN){
            this.closeLoginModal();
        }
    }
    closeLoginModal = () => {
        this.props.triggerLogin(false);
    }
    onRegisterModalToOpen = () => {
        this.closeLoginModal();
        this.setState({activeModal: this.modals.REGISTER})
    }

    onForgotPasswordModalToOpen = () => {
        this.closeLoginModal();
        this.setState({activeModal: this.modals.FORGOT_PASSWORD})
    }

    render() {
        return (
            <Fragment>
                <LoginModal modalId={this.modals.LOGIN} active={this.state.activeModal} onForgotPassword={this.onForgotPasswordModalToOpen} onRegister={this.onRegisterModalToOpen} handleClose={this.handleModalClose}/>
                <RegisterModal modalId={this.modals.REGISTER} active={this.state.activeModal} handleClose={this.handleModalClose}/>
                <ForgotPasswordModal modalId={this.modals.FORGOT_PASSWORD} active={this.state.activeModal} handleClose={this.handleModalClose}/>
            </Fragment>
        );
    }
}

export default RegistrationModals;