import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";

import "./Login.css";
/* The class to handle the login tab*/
class Login extends Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  login() {
    const { username, password } = this.state;

    console.log(username, password);
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <h1>Login</h1>
          <Form onSubmit={this.login}>
            <Form.Input
              fluid
              name="username"
              label="Username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Form.Button primary>Submit</Form.Button>
            <Message success header="Login Successful" />
            <Message error header="Invalid login" />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
