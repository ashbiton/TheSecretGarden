import Consumer from './Consumer';
import Supplier from './Supplier';
import Worker from './Worker';
import React, { Component } from 'react';
class FormByPosition extends Component {
    state = {}
    render() {
        const { position, data } = this.props;
        switch (position) {
            case "manager":
            case "employee":
                return <Worker data={data} />
            case "manager":
                return <Supplier data={data} />
            case "consumer":
            default:
                return <Consumer data={data} />
        }
    }
}

export default FormByPosition;