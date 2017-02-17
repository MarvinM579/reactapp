import React from "react";
import Header from "./Header";
import UserEdit from "./UserEdit";

import { Link } from 'react-router';


export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user_auth: '',
            user: '',
            loggedIn: false
        };
        // this.doLogin = this.doLogin.bind(this);
        this.update = this.update.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    };


    update(user, event) {
        this.setState({
            user:user
        });
    }

    handleLogin(){
        console.log("running in layout");
        this.setState({loggedIn:true});
    }

    render() {

        return (
            <div>
            <div id="Header">
            <Header handleLogin={this.handleLogin}/>
            </div>
            <div id="UserEdit">
            <UserEdit loggedIn={this.state.loggedIn} update={this.update} />
            </div>
            </div>
        )
    }

}
