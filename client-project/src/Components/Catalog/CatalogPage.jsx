import React, { Component } from 'react';
import AddFlower from './AddFlower';
import { Tab, Tabs } from "react-bootstrap";
const { getAll } = require('../../utils/server_utils')

class CatalogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const canAdd = true;
        if (canAdd) {
            return (
                <div className="container-fluid pt-2">
                    <Tabs defaultActiveKey={0}>
                        <Tab eventKey={0} title="Add Flower">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <AddFlower />
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Catalog">
                            <FlowerContainer />
                        </Tab>
                    </Tabs>
                </div>
            );
        }
        else {
            return <FlowerContainer />
        }
    }
}

class FlowerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: []
        }
    }
    getFlowers = async () => {
        const flowers = await getAll('flowers');
        this.setState({ flowers: flowers });
    }
    componentDidMount() {
        this.getFlowers();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="flowers-container">
                            {
                                this.state.flowers.map((flower, index) => {
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
    render() {
        const flower = this.props.flower;
        return (
            <div className="flip-card flower-item">
                <div className="flip-card-inner">
                    <div className="flip-card-front"><img className="flower-img" alt="Card image cap" /></div>
                    <div className="flip-card-back flower-details">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <h5 className="secret flower-name">{flower.name}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>Color :
                                        {
                                            this.flower.color.map((color, index) => {
                                                const colorStyle = "color:" + color;
                                                return (
                                                    <span key={"flower-" + this.props.key + "-color-" + index}>
                                                        <i className="fa" style={colorStyle}>&#xf1fc</i>
                                                    </span>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>Cost : {flower.cost}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default CatalogPage;