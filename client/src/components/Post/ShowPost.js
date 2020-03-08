import React from "react";
import { Button } from "react-bootstrap";

import API from "../../utils/API";

export class ShowPost extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      post: []
    };
    this.loadPost = this.loadPost.bind(this);
    const {id} = this.props.match.params;

    this.loadPost(id);
  };

  

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  information = () => {
    window.location = "/information";
  };

  post = () => {
    window.location = "/createPost";
  };

  loadPost = async (id) => {
    const res = API.getPost(id);
    this.setState({
      post: (await res).data
    });
  };

  render() {
    const { post } = this.state;
    return (
      <div>
      <nav id="navbar-custom" class="navbar navbar-default navbar-fixed-left">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Filtres</a>
            </div>
            <input type="text" class="form-control" id="validationTooltip01" value="Recherche" required></input>
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
            <Button  block bsSize="large" type="submit" onClick={this.disconnect}>
              Se déconnecter
            </Button>
            <Button block bsSize="large" type="submit" onClick={this.information}>
              Mes informations
            </Button>
            <Button block bsSize="large" type="submit" onClick={this.post}>
              Poster
            </Button>
        </nav>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
      </div>

      <div class="list-group">
        <a class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{this.post.description}</h5>
            <small>Posté par {post.userId.pseudo} le {post.create}</small>
          </div>
          <p class="mb-1">{post.libelle}</p>
          <small>Categorie : {post.categorie}</small>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {post.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {post.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {post.signalement.length}
          </button>
        </a>
        
        
      </div>
      
        

      

  </div>
    );
  }
}