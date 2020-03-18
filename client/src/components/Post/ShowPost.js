import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import ReactDOM from 'react-dom';

import API from "../../utils/API";
import Navbar from '../../components/Navbar';

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
    reponseAdd: "",
    reponses: []
    };
    this.loadPost = this.loadPost.bind(this);
    this.owner = this.owner.bind(this);
    this.updatePostView = this.updatePostView.bind(this);
    this.updatePost = this.updatePost.bind(this)
    const {id} = this.props.match.params;
    
    this.loadPost(id);
    this.loadReponse(id);

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

  homePage = () => {
    window.location = "/dashboard";
  };

  notification = () => {
    window.location = "/notification";
  };

  loadPost = async (id) => {
    const res = API.getPost(id).then( res => {
      this.setState({
        post: res.data
      });
      
      this.owner();
    }
    )
  };

  loadReponse = async (id) => {
    const res = API.getAllReponse(id).then( res => {
      this.setState({
        reponses: res.data
      })
    }
    )
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  likePost = async (element) => {
    if(element.like.includes(localStorage.getItem("_id"))){
      await API.deleteLikePost(element._id);
    }
    else{
      await API.addLikePost(element._id);
    }
    const {id} = this.props.match.params;
    this.loadPost(id);
  };
  
  dislikePost = async (element) => {
    if(element.dislike.includes(localStorage.getItem("_id"))){
      await API.deleteDislikePost(element._id);
    }
    else{
      await API.addDislikePost(element._id);
    } 
    const {id} = this.props.match.params;
    this.loadPost(id);
  };

  signalerPost = async (element) => {
    if(element.signalement.includes(localStorage.getItem("_id"))){
      await API.deleteSignalementPost(element._id);
    }
    else{
      await API.addSignalementPost(element._id);
    } 
    const {id} = this.props.match.params;
    this.loadPost(id);
  };

  likeReponse = async (element) => {
    if(element.like.includes(localStorage.getItem("_id"))){
      await API.deleteLikeReponse(element._id);
    }
    else{
      await API.addLikeReponse(element._id);
    }
    const {id} = this.props.match.params;
    this.loadReponse(id);
  };
  
  dislikeReponse = async (element) => {
    if(element.dislike.includes(localStorage.getItem("_id"))){
      await API.deleteDislikeReponse(element._id);
    }
    else{
      await API.addDislikeReponse(element._id);
    } 
    const {id} = this.props.match.params;
    this.loadReponse(id);
  };

  signalerReponse = async (element) => {
    if(element.signalement.includes(localStorage.getItem("_id"))){
      await API.deleteSignalementReponse(element._id);
    }
    else{
      await API.addSignalementReponse(element._id);
    } 
    const {id} = this.props.match.params;
    this.loadReponse(id);
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
        const { data } = await API.createReponse(reponseAdd, token, id);        
        //reload les reponseAdds    
        this.setState({
          reponseAdd: ""
        })
        this.loadReponse(id);       
      } catch (error) {
        console.error(error);
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> {error.response.data.text} !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
  };

  owner = async () => {
    
    if(this.state.post.userId._id == localStorage.getItem("_id")){
      ReactDOM.render(
        React.createElement('div', {}, 
        <button type="button" class="btn btn-default btn-sm btn-info" onClick={() => this.updatePostView()}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Modifier !
        </button>),
        document.getElementById("owner")
      );
    };
  };

  updatePostView = async () => {
    const { post } = this.state;
    ReactDOM.render(
      React.createElement('div', {}, 
      <div className="Titre">
      <FormGroup controlId="description" bsSize="large">
        <ControlLabel>Titre</ControlLabel>
        <FormControl
          autoFocus
          type="text"
          value={post.description}
          onChange={this.handleChangePost}
        />
        <div id="descriptionError"></div>
      </FormGroup>       
      <FormGroup controlId="libelle" bsSize="large">
        <ControlLabel>Libelle</ControlLabel>
        <FormControl 
          autoFocus
          componentClass="textarea"
          type="text"
          value={post.libelle}
          onChange={this.handleChangePost}
        />
        <div id="libelleError"></div>
      </FormGroup>
      <FormGroup controlId="categorie" bsSize="large">
        <ControlLabel>Categorie</ControlLabel>
        <FormControl componentClass="select" placeholder="select" value={post.categorie}
                onChange={this.handleChangePost}>
            <option value="...">Selectionner une categorie</option>
            <option value="Personnel">personnel</option>
            <option value="Livre">livre</option>
            <option value="Film">film</option>
            <option value="Humour">humour</option>
            <option value="Citation">citation</option>
            <option value="Reseaux">reseaux</option>
            <option value="Autre">autres</option>
        </FormControl>
                
        <div id="categorieError"></div>
      </FormGroup>
     
      <Button onClick={this.updatePost} block bsSize="large" type="submit">
        Poster
      </Button>
      <div id="errorSubmit"></div>
      <Button onClick={this.owner} block bsSize="large" type="submit">
        Annuler
      </Button>
    </div>),
      document.getElementById("owner")
    );
  };

  handleChangePost = async (event) => {
    await  this.setState({
      post: {
            ...this.state.post,
            [event.target.id]: event.target.value
      }
    })
    this.updatePostView();
  };


  updatePost = async () => {
    const { post } = this.state;
    var valide = true;
    if (!post.description || post.description.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre description !</p>),
        document.getElementById("descriptionError")
      )
      valide = false;
    }
    
    if (!post.libelle || post.libelle.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre libelle !</p>),
        document.getElementById("libelleError")
      )
      valide = false;
    }
    if (!post.categorie || post.categorie.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre categorie !</p>),
        document.getElementById("categorieError")
      )
      valide = false;
    }
    
    if(valide){
      try {
        const token = localStorage.getItem("token")
        const postId = post._id;
        const description = post.description;
        const libelle = post.libelle;
        const categorie = post.categorie;
        const { data } = await API.updatePost({ postId, description, libelle, categorie, token }); 
        if(data.text == "Succès"){
          ReactDOM.render(
            React.createElement('div', {}, <p className="bg-success"> Le post a bien était modifier !</p>),
            document.getElementById("owner")
          )
        }else{
          ReactDOM.render(
            React.createElement('div', {}, <p className="error"> Erreur de modification !</p>),
            document.getElementById("errorSubmit")
          )
        }
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
    const { post, reponseAdd, reponses } = this.state;
    return (
      <Grid>
       <Row mt>
        <Navbar/>
          <Col md={9}>
      <div className="Dashboard">
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        
      </div>

      <div class="list-group">
        <a class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{post.description}</h5>
            <small>Posté par {post.userId.pseudo} le {post.create}</small>
          </div>
          <p class="mb-1">{post.libelle}</p>
          <small>Categorie : {post.categorie}</small>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.likePost(post)}>
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {post.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.dislikePost(post)}>
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {post.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.signalerPost(post)}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {post.signalement.length}
          </button>
        </a>
        <div id="owner"></div>
        
      </div>

      <div className="Dashboard">
        <h2>Toutes les reponses :</h2>
        
      </div>

      {reponses.map(element => 
      <div class="list-group">
        <a class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <small>Posté par {element.userId.pseudo} le {element.create}</small>
          </div>
          <p class="mb-1">{element.libelle}</p>
        </a>
        <button type="button" class="btn btn-default btn-sm" onClick={() => this.likeReponse(element)}>
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {element.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.dislikeReponse(element)}>
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {element.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => this.signalerReponse(element)}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {element.signalement.length}
          </button>
      </div>
      )}
      
      <div id="comment"> 
      <FormGroup controlId="reponseAdd" bsSize="large">
          <ControlLabel>Ajouter une réponse</ControlLabel>
          <FormControl
            type="text"
            value={reponseAdd}
            onChange={this.handleChange}
          />
          <div id="reponseAddError"></div>
      </FormGroup>       
        
       
        <Button onClick={this.send} block bsSize="large" type="submit">
          Poster
        </Button>
        <Button onClick={this.homePage} block bsSize="large" type="submit">
          Retour
        </Button>
        <div id="errorSubmit"></div>
        
      </div> 
      
      </Col>
    </Row>
  </Grid>
    );
  }
}