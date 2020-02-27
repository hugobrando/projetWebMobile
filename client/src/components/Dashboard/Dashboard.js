import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class Dashboard extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  information = () => {
    window.location = "/information";
  };

  render() {
    return (
      <div>
      <nav id="navbar-custom" class="navbar navbar-default navbar-fixed-left">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Filtres</a>
            </div>
            <a class="navbar-brand" href="#">Acceuil</a>
        
        </nav>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        <Button onClick={this.disconnect} block bsSize="large" type="submit">
          Se déconnecter
        </Button>
        <Button onClick={this.information} block bsSize="large" type="submit">
          Voir mes informations
        </Button>
      </div>
      </div>
    );
  }
}