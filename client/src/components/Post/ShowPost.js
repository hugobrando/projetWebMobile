import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM from 'react-dom';

import API from "../../utils/API";

export class ShowPost extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      post: {
        "like": [],
        "dislike": [],
        "signalement": [],
        "reponses": [],
        "_id": "",
        "description": "",
        "libelle": "",
        "userId": {
            "_id": "",
            "pseudo": ""
        },
        "categorie": "",
        "create": ""
    },
    reponseAdd: ""
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
    const res = API.getPost(id).then( res => {
      this.setState({
        post: res.data
      })
    }
    )
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  send = async () => {
    const { post, reponseAdd } = this.state;
    var valide = true;
    if (!reponseAdd || reponseAdd.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir une réponse !</p>),
        document.getElementById("reponseAddError")
      )
      valide = false;
    }
    
    if(valide){
      try {
        const token = localStorage.getItem("token")
        const id = post._id;
        const { data } = await API.createReponse({ reponseAdd, token, id });        
        //reload les reponseAdds
      } catch (error) {
        console.error(error);
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> {error.response.data.text} !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
  };


  render() {
    const { post, reponseAdd } = this.state;
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
      
      <div id="comment"> 
      <FormGroup controlId="description" bsSize="large">
          <ControlLabel>Ajouter une réponse</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={reponseAdd}
            onChange={this.handleChange}
          />
          <div id="reponseAddError"></div>
      </FormGroup>       
        
       
        <Button onClick={this.send} block bsSize="large" type="submit">
          Poster
        </Button>
        <div id="errorSubmit"></div>
        
      </div> 
      

  </div>
    );
  }
}