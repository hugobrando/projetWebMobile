import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from "../../utils/API";
import ReactDOM from 'react-dom';


export class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    pseudo: "",
    firstname: "",
    lastname: "",
    birthday: "",
    adress: "",
    tel: ""
  };
  send = async () => {
    const { email, password, cpassword, pseudo, firstname, lastname, birthday, adress, tel } = this.state;
    var valide = true;
    if (!email || email.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre email !</p>),
        document.getElementById("emailError")
      )
      valide = false;
    }
    if (!password || password.length === 0 || password !== cpassword) {
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Les deux password doivent être identique !</p>), 
        document.getElementById("passwordError")
      )
      valide = false;
    };
    if (!pseudo || pseudo.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre pseudo !</p>),
        document.getElementById("pseudoError")
      )
      valide = false;
    }
    if (!firstname || firstname.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre nom !</p>),
        document.getElementById("firstnameError")
      )
      valide = false;
    }
    if (!birthday || birthday.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre date de naissance !</p>),
        document.getElementById("birthdayError")
      )
      valide = false;
    }
    if (!adress || adress.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre adresse !</p>),
        document.getElementById("adressError")
      )
      valide = false;
    }
    if (!tel || tel.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre numéro de téléphone !</p>),
        document.getElementById("telError")
      )
      valide = false;
    }
    if(valide){
      try {
        const token = localStorage.getItem("token")
        const { data } = await API.signup({ token, email, password, pseudo, firstname, lastname, birthday, adress, tel });
        localStorage.setItem("token", data.token);
        localStorage.setItem("nom", data.nom);
        localStorage.setItem("prenom", data.prenom);
        localStorage.setItem("_id", data._id);
        window.location = "/";
      } catch (error) {
        console.error(error);
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> {error.response.data.text} !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
  };
  login = () => {
    window.location = "/";
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password, cpassword, pseudo, firstname, lastname, birthday, adress, tel } = this.state;
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
          <div id="emailError"></div>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
          <div id="passwordError"></div>
        </FormGroup>
        <FormGroup controlId="pseudo" bsSize="large">
          <ControlLabel>Pseudo</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={pseudo}
            onChange={this.handleChange}
          />
          <div id="pseudoError"></div>
        </FormGroup>
        <FormGroup controlId="firstname" bsSize="large">
          <ControlLabel>Nom</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={firstname}
            onChange={this.handleChange}
          />
          <div id="firstnameError"></div>
        </FormGroup>
        <FormGroup controlId="lastname" bsSize="large">
          <ControlLabel>Prenom</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={lastname}
            onChange={this.handleChange}
          />
          <div id="lastnameError"></div>
        </FormGroup>
        <FormGroup controlId="birthday" bsSize="large">
          <ControlLabel>Date de naissance</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={birthday}
            onChange={this.handleChange}
          />
          <div id="birthdayError"></div>
        </FormGroup>
        <FormGroup controlId="adress" bsSize="large">
          <ControlLabel>Adresse complète</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={adress}
            onChange={this.handleChange}
          />
          <div id="adressError"></div>
        </FormGroup>
        <FormGroup controlId="tel" bsSize="large">
          <ControlLabel>Téléphone</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$"
            value={tel}
            onChange={this.handleChange}
          />
          <div id="telError"></div>
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          S'inscrire
        </Button>
        <div id="errorSubmit"></div>
        <Button onClick={this.login} block bsSize="large" type="submit">
          Déjà inscrit
        </Button>
      </div>
    );
  }
}