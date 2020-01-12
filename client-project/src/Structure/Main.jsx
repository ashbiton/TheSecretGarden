import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import About from "../General/About";
import Contact from "../General/Contact";
import HomePage from "../General/HomePage";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <main role="main" className="container">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                {/* <Route path="/register" component={Register}/> */}
                {/* the following should be a private route */}
                {/* <Route path="/users" component={UsersRoute} /> */}
                {/* <Route path="/stock" component={StockRoute}/> */}
            {/* <PrivateRoute path="/orders" component={Orders}/> */}
            
            </Switch>
        </main>);
    }
}
 
export default Main;