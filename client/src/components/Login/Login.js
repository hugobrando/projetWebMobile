import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import ReactDOM from 'react-dom';

export class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      //const error = React.createElement('p', {}, 'Vous avez oubliez de saisir un champ !')
        
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir un champ !</p>), // si non on peut mettre la variable error
        document.getElementById("errorSaisie")
      )
      return;
    }
    if (!password || password.length === 0) {
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir un champ !</p>), // si non on peut mettre la variable error
        document.getElementById("errorSaisie")
      )
      return;
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("nom", data.nom);
      localStorage.setItem("prenom", data.prenom);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Email ou mot de passe faux !</p>), // si non on peut mettre la variable error
        document.getElementById("errorSaisie")
      )
    }
  };
  signup = () => {
    window.location = "/signup";
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    if(API.isAuth){
      window.location = "/dashboard";
    }
    const { email, password } = this.state;
    return (
      <div className="Login">
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <div id="errorSaisie">
        </div>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Connexion
        </Button>
        <Button onClick={this.signup} block bsSize="large" type="submit">
          S'inscrire
        </Button>
      </div>
    );
  }
}