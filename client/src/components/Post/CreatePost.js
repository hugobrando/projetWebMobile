import React from "react";
import { Button, FormGroup, FormControl, ControlLabel,  } from "react-bootstrap";
import API from "../../utils/API";
import ReactDOM from 'react-dom';


export class CreatePost extends React.Component {
  state = {
    description: "",
    libelle: "",
    categorie: ""
  };
  send = async () => {
    const { description, libelle, categorie } = this.state;
    var valide = true;
    if (!description || description.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre description !</p>),
        document.getElementById("descriptionError")
      )
      valide = false;
    }
    
    if (!libelle || libelle.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre libelle !</p>),
        document.getElementById("libelleError")
      )
      valide = false;
    }
    if (!categorie || categorie.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre categorie !</p>),
        document.getElementById("categorieError")
      )
      valide = false;
    }
    
    if(valide){
      try {
        const token = localStorage.getItem("token")
        const { data } = await API.createPost({ description, libelle, token, categorie });        
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
  homePage = () => {
    window.location = "/";
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { description, libelle, categorie } = this.state;
    return (
      <div className="Titre">
        <FormGroup controlId="description" bsSize="large">
          <ControlLabel>Titre</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={description}
            onChange={this.handleChange}
          />
          <div id="descriptionError"></div>
        </FormGroup>       
        <FormGroup controlId="libelle" bsSize="large">
          <ControlLabel>Libelle</ControlLabel>
          <FormControl 
            autoFocus
            componentClass="textarea"
            type="text"
            value={libelle}
            onChange={this.handleChange}
          />
          <div id="libelleError"></div>
        </FormGroup>
        <FormGroup controlId="categorie" bsSize="large">
          <ControlLabel>Categorie</ControlLabel>
          <FormControl componentClass="select" placeholder="select" value={categorie}
                  onChange={this.handleChange}>
              <option value="...">Selectionner une categorie</option>
              <option value="Personnel">Personnel</option>
              <option value="Livre">Livre</option>
              <option value="Film">Film</option>
              <option value="Humour">Humour</option>
              <option value="Citation">Citation</option>
              <option value="Reseaux">Réseaux</option>
              <option value="Autre">Autres</option>
          </FormControl>
                  
          <div id="categorieError"></div>
        </FormGroup>
       
        <Button onClick={this.send} block bsSize="large" type="submit">
          Poster
        </Button>
        <div id="errorSubmit"></div>
        <Button onClick={this.homePage} block bsSize="large" type="submit">
          Annuler
        </Button>
      </div>
    );
  }
}