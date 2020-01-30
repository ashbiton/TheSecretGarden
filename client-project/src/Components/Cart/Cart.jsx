import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

class Cart extends Component {
    constructor(props) {
        super(props);
    }
    editItemQuantity = (itemId, amount) => {
        this.props.ShoppingCart.onEditItemAmount(itemId,amount);
    }
    render() {
        return (
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="colored-header capitilize" scope="col" colSpan="2">Item</th>
                            <th className="colored-header capitilize" scope="col">Price</th>
                            <th className="colored-header capitilize" scope="col" colSpan="3">Quantity</th>
                            <th className="colored-header capitilize" scope="col">total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.ShoppingCart.entries.map((entry, index) => {
                                return <SingleItem key={index + "shoppint-entry"} entry={entry} editItemQuantity={this.editItemQuantity} />
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{this.props.ShoppingCart.total} <i class="fas fa-money-bill-wave"></i></td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-outline-dark">Checkout</button>
            </div>
        );
    }
}

class SingleItem extends Component {
    constructor(props) {
        super(props);
    }
    increaseAmount = () => {
        this.props.editItemQuantity(this.props.entry.item.id,1);
    }
    
    decreaseAmount = () => {
        this.props.editItemQuantity(this.props.entry.item.id,-1);
    }
    render() {
        return (
            <tr>
                <td valign="middle"><img className="rounded-circle" width="50px" src={`/images/flowers/${this.props.entry.item.img}`}></img></td>
                <td valign="middle">{this.props.entry.item.name}</td>
                <td valign="middle">{this.props.entry.item.cost} <i class="fas fa-money-bill-wave"></i></td>
                <td valign="middle" onClick={this.decreaseAmount}><i class="fas fa-minus-circle"></i></td>
                <td valign="middle">{this.props.entry.amount}</td>
                <td valign="middle" onClick={this.increaseAmount}><i class="fas fa-plus-circle"></i></td>
                <td valign="middle">{this.props.entry.price}</td>
            </tr>
        );
    }
}

export default inject('ShoppingCart')(observer(Cart));