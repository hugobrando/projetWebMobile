import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allNotification: []
    };

    this.loadAllNotification = this.loadAllNotification.bind(this);
    this.loadAllNotification();
  }
  

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

  homePage = () => {
    window.location = "/dashboard";
  };

  post = () => {
    window.location = "/createPost";
  };

  showNotification = async (element) => {
    const res = API.notificationVue(element._id);
  }

  loadAllNotification = async () => {
    const res = API.getAllNotification();
    this.setState({
        allNotification: (await res).data
    });
  };

  render() {
    const { allNotification } = this.state;
    return (
      <div>
      <nav id="navbar-custom" class="navbar navbar-default navbar-fixed-left">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Filtres</a>
            </div>
            <input type="text" class="form-control" id="validationTooltip01" placeholder="Rechercher" required></input>
            <Button block bsSize="small" type="submit">
              Rechercher
            </Button>
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
    <form>
  <div class="form-group">
    <label for="formControlRange">Test de filtre</label>
    <input type="range" class="form-control-range" id="formControlRange"></input>
  </div>
</form>
    </div>
            <Button block bsSize="large" type="submit" onClick={this.homePage}>
              Fil d'actualité
            </Button>
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
        </nav>
      <div className="Dashboard">
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
      </div>
      {allNotification.map(element => {
          if(!element.vue) {
            return(
            <div class="list-group" >
              <a href={"post/" + element.postId._id} class="list-group-item list-group-item-action active" onClick={() => this.showNotification(element)}>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{element.postId.description}</h5>
                </div>
                <p class="mb-1">Vous avez {element.postId.like.length} like, {element.postId.dislike.length} dislike, {element.postId.signalement.length} signalements ! </p>
                <p class="mb-1">Et {element.postId.reponses.length} réponses ! </p>
                <small>Categorie : {element.postId.categorie}</small>
              </a>
                  
            </div>)
          }
          else{
            return(
              <div class="list-group" >
                <a href={"post/" + element.postId._id} class="list-group-item list-group-item-action" onClick={() => this.showNotification(element)}>
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{element.postId.description}</h5>
                  </div>
                  <p class="mb-1">Vous avez {element.postId.like.length} like, {element.postId.dislike.length} dislike, {element.postId.signalement.length} signalements ! </p>
                  <p class="mb-1">Et {element.postId.reponses.length} réponses ! </p>
                  <small>Categorie : {element.postId.categorie}</small>
                </a>
                    
              </div>)
          }
        }
      )
      
        
      }
      

  </div>
    );
  }
}