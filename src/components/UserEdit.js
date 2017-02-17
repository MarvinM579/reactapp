import React from "react";
import { Link } from 'react-router';

export default class UserEdit extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        user: {
            username:'IMJoe',
            password:'what',
            first_name:'Joe',
            last_name:'Somebody',
            avatar: 'https://s-media-cache-ak0.pinimg.com/736x/ac/98/6f/ac986f08867e932ae3edbe05cd29e8f8.jpg'
        }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(key, event) {
        const user = this.state.user;
        user[key] = event.target.value;
        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        console.log('updated login: ' + this.state.user)
        event.preventDefault();
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
                <input placeholder="username" type="text" value={this.state.user.username} onChange={this.handleChange.bind(this, 'username')} />
                <br/>
                <input placeholder="password" type="text" value={this.state.user.password} onChange={this.handleChange.bind(this, 'password')} />
                <br/>
                <input placeholder="first_name" type="text" value={this.state.user.first_name} onChange={this.handleChange.bind(this, 'first_name')} />
                <br/>
                <input placeholder="last_name" type="text" value={this.state.user.last_name} onChange={this.handleChange.bind(this, 'last_name')} />
                <br/>
                <input placeholder="avatar" type="text" value={this.state.user.avatar} onChange={this.handleChange.bind(this, 'avatar')} />
                <br/>
                <br/>
            <input type="submit" value="submit" onClick={this.props.update.bind(null,this.state.user)}/>
            </form>
        );
    }

}
