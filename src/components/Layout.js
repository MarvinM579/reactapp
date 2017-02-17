import React from "react";
import Header from "./Header";
import UserEdit from "./UserEdit";
import axios from 'axios';
import { Link } from 'react-router';


export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user_auth: '',
            user: '',
            loggedIn: false
        };
        this.doLogin = this.doLogin.bind(this);
        this.update = this.update.bind(this);
    };

    doLogin(user_auth, event) {
        console.log('logging in');
        this.setState({
            user_auth: user_auth
        });
        console.log('logged in');

        axios.post('/login', {
            username: 'user_auth.username',
            password: 'user_auth.password'
        })
        .then(function (response){
            console.log(response);
        })
        .catch(function (error){
            console.log(error);
        })
    }

    update(user, event) {
        this.setState({
            user:user
        });
    }

    render() {

        return (
            <div>
            <div id="Header">
            <Header doLogin={this.doLogin} />
            </div>
            <div id="UserEdit">
            <UserEdit update={this.update} />
            </div>
            </div>
        )
    }

}
