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
            <div>
            <label for="Select1">tri des posts</label>
    <select class="form-control" id="Select1">
      <option>...</option>
      <option>-10 likes</option>
      <option>10-20 likes</option>
      <option>20-50 likes</option>
      <option>50-100 likes</option>
      <option>+100 likes</option>
    </select>
    </div>
            <Button onClick={this.disconnect} block bsSize="large" type="submit">
              Se déconnecter
            </Button>
            <Button onClick={this.information} block bsSize="large" type="submit">
              Mes informations
            </Button>
        </nav>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
      </div>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Titre du post</h5>
            <small>Posté par jojolabricot il y a 2 h</small>
          </div>
          <p class="mb-1">Libelle harcelement : je me suis fais agresser en sortant du tram par alkope qui m'a traité docoto mega pute.</p>
          <small>Categorie : Harcelement</small>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-up"></span> Like
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-down"></span> Unlike
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler
          </button>
        </a>
        
        
</div>
      </div>
    );
  }
}