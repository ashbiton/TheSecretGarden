import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
class FlowerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.Flowers.getFlowers();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="flowers-container">
                            {
                                this.props.Flowers.flowers.map((flower, index) => {
                                    return (
                                        <Flower flower={flower} key={"flower-" + index} />
                                    )

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Flower extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    addFlowerToCart = () => {
        
    }
    render() {
        const flower = this.props.flower;
        const src = (flower.img.includes("http") || flower.img.includes("base64")) ? flower.img : `images/flowers/${flower.img}`
        return (
            <div className="flip-card flower-item">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="flower-img" alt="Card image cap" src={src} />
                    </div>
                    <div className="flip-card-back flower-details">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <h5 className="secret flower-name">{flower.name}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>
                                        {
                                            flower.color.map((color, index) => {
                                                const colorStyle = { color: color };
                                                return (
                                                    <span key={"flower-" + this.props.key + "-color-" + index}>
                                                        <i className="fas fa-paint-brush" style={colorStyle}></i>
                                                    </span>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p><strong>{flower.cost}  </strong><i class="fas fa-money-bill-wave"></i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" class="btn btn-default btn-dark btn-sm" onClick={this.addFlowerToCart}>
                                     Add to Cart
</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default inject('Flowers')(observer(FlowerContainer));