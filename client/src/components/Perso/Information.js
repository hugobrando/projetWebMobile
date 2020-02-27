import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM from 'react-dom';

import API from "../../utils/API";

export class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pseudo: "",
      firstname: "",
      lastname: "",
      birthday: "",
      adress: "",
      tel: ""
      };

    this.handleChange = this.handleChange.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    this.loadInfo();
  }
    

    loadInfo = async () => {
      const user = API.getInfoUser();
      this.setState({
        email: (await user).data.email,
        pseudo: (await user).data.pseudo,
        firstname: (await user).data.firstname,
        lastname: (await user).data.lastname,
        birthday: (await user).data.birthday,
        adress: (await user).data.adress,
        tel: (await user).data.tel,
      });
    };

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        });
      };

    dasboard = () => {
        window.location = "/dashboard";
      };

    modify = async () => {
        const { email, pseudo, firstname, lastname, birthday, adress, tel } = this.state;
        var valide = true;
        if (!email || email.length === 0){
          ReactDOM.render(
            React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir un champ !</p>),
            document.getElementById("emailError")
          )
          valide = false;
        } 
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
              const { data } = await API.modifyInfo(email, pseudo, firstname, lastname, birthday, adress, tel);
              localStorage.setItem("token", data.token);
              localStorage.setItem("nom", data.nom);
              localStorage.setItem("prenom", data.prenom);
              window.location = "/dashboard";
          } catch (error) {
              console.error(error);
              ReactDOM.render(
                React.createElement('div', {}, <p className="error"> {error.response.data.text} !</p>),
                document.getElementById("errorSubmit")
              )
          }
        }
    };

    stringToDate  = (stringDate) => {
      var formatItems=stringDate.split("T");
      return formatItems[0];
    }

  render() {
    return (
      <div className="Dashboard">
        <h1>Mes Informations</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        <Button onClick={this.dasboard} block bsSize="large" type="submit">
          Go to Dashboard
        </Button>

        <div className="Login">
            <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="emailError"></div>
            <FormGroup controlId="pseudo" bsSize="large">
            <ControlLabel>Pseudo</ControlLabel>
            <FormControl
                type="text"
                value={this.state.pseudo}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="pseudoError"></div>
            <FormGroup controlId="firstname" bsSize="large">
            <ControlLabel>Nom</ControlLabel>
            <FormControl
                type="text"
                value={this.state.firstname}
                onChange={this.handleChange}
            />
            <div id="firstnameError"></div>
            </FormGroup>
            <FormGroup controlId="lastname" bsSize="large">
            <ControlLabel>Prénom</ControlLabel>
            <FormControl
                type="text"
                value={this.state.lastname}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="lastnameError"></div>
            <FormGroup controlId="birthday" bsSize="large">
            <ControlLabel>Date de naissance</ControlLabel>
            <FormControl
                type="date"
                value={this.stringToDate(this.state.birthday)}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="birthdayError"></div>
            <FormGroup controlId="adress" bsSize="large">
            <ControlLabel>Adresse complète</ControlLabel>
            <FormControl
                type="text"
                value={this.state.adress}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="adressError"></div>
            <FormGroup controlId="tel" bsSize="large">
            <ControlLabel>Téléphone</ControlLabel>
            <FormControl
                type="text"
                value={this.state.tel}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="telError"></div>
            <div id="errorSubmit">
            </div>
            <Button onClick={this.modify} block bsSize="large" type="submit">
            Modifier !
            </Button>
            
        </div>
      </div>
    );
  }
}