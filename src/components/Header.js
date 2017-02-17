import React from "react";
import { Link } from 'react-router';
import axios from 'axios';
export default class Header extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        user_auth: {
        username:"",
        password:""
    },
        loggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleChange(key, event) {
      const user_auth = this.state.user_auth;
      user_auth[key] = event.target.value;
      this.setState({
          user_auth: user_auth
      });
  }
  handleSubmit(event) {
    console.log('login: ' + this.state.user_auth);
    event.preventDefault();
  }

  doLogin(event) {
      console.log('logging in');
    //   this.setState({
    //       user_auth: user_auth,
    //       loggedIn: false
    //   });
    var self = this;
        this.props.handleLogin();
      axios.post('/login', {
          username: this.state.user_auth.username,
          password: this.state.user_auth.password
      })
      .then(function (response){
          console.log('logged in');
          console.log(response);
          self.setState({
              loggedIn: true
          });
      })
      .catch(function (error){
          console.log(error);
      })
  }

  render() {
      if(this.state.loggedIn){
          return (<h2>You are logged in</h2>);


            } else {
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
                          <input type="submit" value="Submit" onClick={this.doLogin}/>
                        </form>
                    );
            }
  }
}
