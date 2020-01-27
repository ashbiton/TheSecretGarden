import React, { Component, Fragment } from 'react';
const _ = require('lodash');
class Consumer extends Component {
    render() {
        let data = this.props.data || {};
        return (
            <Fragment>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Name</label>
                    <div className="col-md-10">
                        <input className="form-control name capitilize" type="text" defaultValue={data.name || ""} name="name" pattern="^[A-Za-z]+$" placeholder="First Name" required="required" /></div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Surname</label>
                    <div className="col-md-10">
                        <input className="form-control surname capitilize" type="text" defaultValue={data.surname || ""} name="surname" pattern="^[A-Za-z]+$" placeholder="Last Name" required="required" /></div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Username</label>
                    <div className="col-md-10">
                        <input className="form-control username" type="text" name="username" required="required" defaultValue={data.username || ""} />
                        <small className="form-text text-muted">Username must be 4-10 characters long</small></div>
                </div>
                {
                    _.isEmpty(this.props.data) ? 
                        <div className="form-group row">
                        <label className="col-md-2 col-form-label">Password</label>
                        <div className="col-md-10">
                            <input className="form-control password" type="password" name="password" pattern="[A-Za-z0-9]{6,12}$" required="required" />
                            <small className="form-text text-muted">Password must include only letters and numbers</small><small className="form-text text-muted">Password must be 6 - 12 characters long</small></div>
                    </div>
                    :
                    null
                }

                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Email</label>
                    <div className="col-md-10">
                        <input className="form-control email" type="email" defaultValue={data.email || ""} name="email" placeholder="example@gmail.com" required="required" /></div>
                </div>
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Phone</label>
                    <div className="col-md-10">
                        <input className="form-control phone" type="tel" defaultValue={data.phone || ""} name="phone" placeholder="0501234567" pattern="05[0-9]{8}" required="required" /></div>
                </div>
            </Fragment>
        );
    }
}

export default Consumer;