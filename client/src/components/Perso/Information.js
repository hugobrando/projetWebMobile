import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM from 'react-dom';

import API from "../../utils/API";

export class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
        const { email, password} = this.state;
        if (!email || email.length === 0){
          ReactDOM.render(
            React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir un champ !</p>),
            document.getElementById("errorSaisie")
          )
          return;
        } 
        if (!password || password.length === 0){
          ReactDOM.render(
            React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir un champ !</p>),
            document.getElementById("errorSaisie")
          )
          return;
        } 
        try {
            const oldEmail =  localStorage.getItem("email")
            await API.modifyInfo(oldEmail, email, password);
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };

  render() {
    return (
      <div className="Dashboard">
        <h1>Mes Information</h1>
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
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                onChange={this.handleChange}
                type="password"
            />
            </FormGroup>
            <FormGroup controlId="pseudo" bsSize="large">
            <ControlLabel>Pseudo</ControlLabel>
            <FormControl
                type="text"
                value={this.state.pseudo}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="firstname" bsSize="large">
            <ControlLabel>Nom</ControlLabel>
            <FormControl
                type="text"
                value={this.state.firstname}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="lastname" bsSize="large">
            <ControlLabel>Prénom</ControlLabel>
            <FormControl
                type="text"
                value={this.state.lastname}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="birthday" bsSize="large">
            <ControlLabel>Date de naissance</ControlLabel>
            <FormControl
                type="date"
                value={this.state.birthday}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="adress" bsSize="large">
            <ControlLabel>Adresse complète</ControlLabel>
            <FormControl
                type="text"
                value={this.state.adress}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="tel" bsSize="large">
            <ControlLabel>Téléphone</ControlLabel>
            <FormControl
                type="text"
                value={this.state.tel}
                onChange={this.handleChange}
            />
            </FormGroup>
            <div id="errorSaisie">
            </div>
            <Button onClick={this.modify} block bsSize="large" type="submit">
            Modifier !
            </Button>
        </div>
      </div>
    );
  }
}