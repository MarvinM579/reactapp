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
                <img src={this.state.user.avatar} />
                <br/>
                <h3>Hello: {this.state.user.username}</h3>
                <br/>
            <input type="submit" value="Click to Edit" onClick={this.props.update.bind(null,this.state.user)}/>
        );
    }

}
