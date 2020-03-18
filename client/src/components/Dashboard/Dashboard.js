import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from 'react-dom';

import API from "../../utils/API";

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: []
    };

    this.loadAllPost = this.loadAllPost.bind(this);
    this.like = this.like.bind(this);
    this.isAdmin = this.isAdmin.bind(this);

    this.loadAllPost();
    this.isAdmin();
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

  like = async (element) => {
    if(element.like.includes(localStorage.getItem("_id"))){
      await API.deleteLikePost(element._id);
    }
    else{
      await API.addLikePost(element._id);
    }
    this.loadAllPost();
  };
  
  dislike = async (element) => {
    if(element.dislike.includes(localStorage.getItem("_id"))){
      await API.deleteDislikePost(element._id);
    }
    else{
      await API.addDislikePost(element._id);
    } 
    this.loadAllPost();
  };

  signaler = async (element) => {
    if(element.signalement.includes(localStorage.getItem("_id"))){
      await API.deleteSignalementPost(element._id);
    }
    else{
      await API.addSignalementPost(element._id);
    } 
    this.loadAllPost();
  };

  post = () => {
    window.location = "/createPost";
  };

  myPosts = () => {
    window.location = "/myPosts";
  };

  loadAllPost = async () => {
    const res = API.getAllPost();
    this.setState({
      allPost: (await res).data,
      allPostLoad: (await res).data
    });
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

  adminPage = async () => {
    if(await API.isAdmin()){
      window.location = "/adminPage";
    };
  }

  //recherche

  filterPost = (event) => {
    this.setState({valueResearch: event.target.value});
    if(event.target.value){
      this.setState({focused: true});
      var updatedPosts = this.state.allPostLoad;
      updatedPosts = updatedPosts.filter(function(item){
        return ((item.description.toLowerCase().search(event.target.value.toLowerCase()) !== -1) || (item.libelle.toLowerCase().search(event.target.value.toLowerCase()) !== -1));//dans le titre ou le libelle
      });
      this.setState({allPost: updatedPosts});
    }
    else{
      this.setState({allPost: this.state.allPostLoad});
    }
    
  };

  render() {
    const { allPost, valueResearch } = this.state;
    return (
      <div>
        <nav id="navbar-custom" class="navbar navbar-default navbar-fixed-top">
            <div class="navbar-header">
                <a class="navbar-brand primary">Association Anti-sexisme</a>
            </div>
        </nav>
      <nav id="navbar-custom" class="navbar navbar-default navbar-fixed-left">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Filtres</a>
            </div>
            <input type="text" class="form-control" id="validationTooltip01" placeholder="Rechercher" required value={valueResearch} onChange={this.filterPost}></input>

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
            <Button block bsSize="large" type="submit" onClick={this.notification}>
              Notifications
            </Button>
            <Button block bsSize="large" type="submit" onClick={this.myPosts}>
              Mes Posts
            </Button>
            <div id="adminButton"></div>
        </nav>
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
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
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.like(element)}>
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {element.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.dislike(element)}>
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {element.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.signaler(element)}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {element.signalement.length}
          </button>
        
        
        
      </div>)
      
        
      }
      

  </div>
    );
  }
}