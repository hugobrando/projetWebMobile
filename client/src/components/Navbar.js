import React from "react";
import { Component } from 'react';
import { Button, Col, Grid } from "react-bootstrap";
import ReactDOM from 'react-dom';
import API from "../utils/API";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.isAdmin();
    };

    disconnect = () => {
        API.logout();
        window.location = "/";
      };
    
    information = () => {
    window.location = "/information";
    };

    notification = () => {
    window.location = "/notification";
    };
    post = () => {
    window.location = "/createPost";
    };

    myPosts = () => {
    window.location = "/myPosts";
    };

      
    isAdmin = async () => {
    if(await API.isAdmin()){
        ReactDOM.render(
        React.createElement('div', {}, 
        <Button block bsSize="large" type="submit" onClick={this.adminPage}>
        Admin
        </Button>),
        document.getElementById("adminButton")
        );
    }
    };

    handleChange = (e) => {
        // Avant : this.setState({temperature: e.target.value});
        this.props.filter(e);
        // la on appelle la fonction qu'on a passer en param lors de l'appel du react.component
    };

    handleSelect = (e) => {
        this.props.selectCategorie(e);
    };
    

render() {

    return (
        <div>
            <Col md={3}>
                <nav id="navbar-custom" class="navbar fixed-left">
                    <div class="navbar-header">
                        <a class="navbar-brand">Filtres</a>
                    </div>
                    <input type="text" class="form-control" id="rechercheInput" placeholder="Rechercher" required value={this.props.valueResearch} onChange={this.handleChange}></input>
                    <div class="checkbox">
                        <label>
                        <input type="checkbox" data-toggle="toggle"></input>
                        Option is enabled
                        </label>
                    </div>
                    <div class="checkbox disabled">
                        <label>
                        <input type="checkbox" disabled data-toggle="toggle"></input>
                        Option is disabled
                        </label>
                    </div>
                    <label for="Select1">tri des posts</label>
                    <select class="form-control" id="selectLike"  onChange={this.handleSelect}>
                        <option value = "0">Nombre de like</option>
                        <option value = "5">+5 likes</option>
                        <option value = "10">+10 likes</option>
                        <option value = "20">+20 likes</option>
                        <option value = "50">+50 likes</option>
                        <option value = "100">+100 likes</option>
                    </select>
                    <select class="form-control" id="selectCategorie" onChange={this.handleSelect}>
                        <option value = "">Selectionner une categorie</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Livre">Livre</option>
                        <option value="Film">Film</option>
                        <option value="Humour">Humour</option>
                        <option value="Citation">Citation</option>
                        <option value="Reseaux">Réseaux</option>
                        <option value="Autre">Autres</option>
                    </select>
                    
                    <Button  block bsSize="large" type="submit" onClick={this.disconnect}>
                        Se déconnecter
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.information}>
                        Mes informations
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.post}>
                        Poster
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.notification}>
                        Notifications
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.myPosts}>
                        Mes Posts
                    </Button>
                    <div id="adminButton">
                    </div>
                </nav>
            </Col>
        </div>
    )}
}
export default Navbar;