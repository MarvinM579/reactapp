import React from "react";
import { Link } from 'react-router';

export default class Header extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        user_auth: {username:null,password:null},
        loggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, event) {
      const user_auth = this.state.user_auth;
      user_auth[key] = event.target.value;
      this.setState({
          user_auth: user_auth,
          loggedIn: true
      });
  }
  handleSubmit(event) {
    console.log('login: ' + this.state.user_auth);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input placeholder="username" type="text" value={this.state.user_auth.username} onChange={this.handleChange.bind(this, 'username')}
            />
          </label>
          <label>
            <input placeholder="password" type="text" value={this.state.user_auth.password} onChange={this.handleChange.bind(this, 'password')}
            />
          </label>
          <input type="submit" value="Submit" onClick={this.props.doLogin.bind(null,this.state.user_auth)}/>
        </form>
    );
  }
}
