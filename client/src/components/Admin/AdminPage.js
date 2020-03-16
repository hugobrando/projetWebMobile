import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: []
    };

    this.loadAllPost = this.loadAllPost.bind(this);
    this.loadAllPost();
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

  post = () => {
    window.location = "/createPost";
  };

  homePage = () => {
    window.location = "/dashboard";
  };

  loadAllPost = async () => {
    const res = API.getAllPostSignaled();
    this.setState({
      allPost: (await res).data
    });
  };

  deletePost = async (post) => {
    await API.deletePost(post._id);
    this.loadAllPost();
  };

  signalementDesc = () => {
    const { allPost } = this.state;  
    allPost.sort(function (a, b) {
                    return b.signalement.length - a.signalement.length;
                    });
    this.setState({
        allPost
        });
    };

    signalementAsc = () => {
        const { allPost } = this.state;  
        allPost.sort(function (a, b) {
                        return a.signalement.length - b.signalement.length;
                        });
        this.setState({
            allPost
            });
        };

  render() {
    const { allPost } = this.state;
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
        <h1>Admin</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        <Button block bsSize="small" type="submit" onClick={this.signalementDesc}>
              Posts signalés descendants
        </Button>
        <Button block bsSize="small" type="submit" onClick={this.signalementAsc}>
              Posts signalés ascendants
        </Button>
      </div>
      {allPost.map(element => 
      <div class="list-group">
        <a href={"post/" + element._id} class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{element.description}</h5>
            <small>Posté par {element.userId.pseudo} le {element.create}</small>
          </div>
          <p class="mb-1">{element.libelle}</p>
          <small>Categorie : {element.categorie}</small>
        </a>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {element.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {element.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {element.signalement.length}
          </button>
          <button type="button" class="btn btn-default btn-sm btn-danger" onClick={() => this.deletePost(element)}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Supprimer !
          </button>
        
        
        
      </div>)
      
        
      }
      

  </div>
    );
  }
}