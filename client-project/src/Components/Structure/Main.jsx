import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import About from "../General/About";
import Contact from "../General/Contact";
import HomePage from "../General/HomePage";
import UsersPage from "../Users/UsersPage";
import CatalogPage from "../Catalog/CatalogPage";
import Chat from '../Chat/Chat';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <main role="main" className="container-fluid">
            <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/home" component={About} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                {/* the following should be a private route */}
                <Route path="/users" component={UsersPage} />
                <Route path="/catalog" component={CatalogPage}/>
            
            </Switch>
            <Chat />
        </main>);
    }
}
 
export default Main;