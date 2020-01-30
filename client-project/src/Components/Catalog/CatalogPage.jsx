import React, { Component } from 'react';
import AddFlower from './AddFlower';
import FlowerContainer from "./FlowerContainer";
import { Tab, Tabs } from "react-bootstrap";
import { observer, inject } from "mobx-react";

class CatalogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const canAdd = this.props.User.user && this.props.User.user.position == "supplier";
        if (canAdd) {
            return (
                <div className="container-fluid pt-2">
                    <Tabs defaultActiveKey={1}>
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

export default inject('User')(observer(CatalogPage));