import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from "react-bootstrap";
import Storage from "../../utils/Storage";
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
        "imageUrl": "",
        "create": ""
    },
    reponseAdd: "",
    reponses: [],
    selectLike: "0",
    allCategorie: [],
    wait: false,
    deleteImage : false
    };
    this.loadPost = this.loadPost.bind(this);
    this.owner = this.owner.bind(this);
    this.updatePostView = this.updatePostView.bind(this);
    this.updatePost = this.updatePost.bind(this)
    this.filterPost = this.filterPost.bind(this);
    this.loadAllCategorie = this.loadAllCategorie.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);



    const {id} = this.props.match.params;
    
    this.loadPost(id);
    this.loadReponse(id);
    this.loadAllCategorie();

  };


  loadPost = async (id) => {
    const res = API.getPost(id).then( res => {
      this.setState({
        post: res.data
      });
      
      if(res.data.imageUrl){
        ReactDOM.render(
          React.createElement('div', {}, 
          <img id="postImage" src={this.state.post.imageUrl} alt="upload-image" className="process__image img-responsive center-block" />    
          ),
          document.getElementById("image")
        );
      }
      this.owner();
    }
    )
  };

  loadReponse = async (id) => {
    const res = API.getAllReponse(id).then( res => {
      this.setState({
        reponses: res.data,
        reponsesLoad: res.data
      })
    }
    )
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
    if(! API.isAuth()){
      ReactDOM.render(
        React.createElement('div', {}, 
        <p className="error">Attention vous n'êtes pas connecté. Connectez vous pour pouvoir écrire une réponse. <br></br> (Copier Coller votre réponse pour ne pas la perdre !)</p>
        ),
        document.getElementById("reponseAddError")
      );
      ReactDOM.render(
        React.createElement('div', {}, 
        ),
        document.getElementById("errorSubmit")
      );
    }
  };

  likePost = async (element) => {
    if(element.like.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteLikePost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addLikePost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    const {id} = this.props.match.params;
    this.loadPost(id);
  };
  
  dislikePost = async (element) => {
    if(element.dislike.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteDislikePost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addDislikePost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    } 
    const {id} = this.props.match.params;
    this.loadPost(id);
  };

  signalerPost = async (element) => {
    if(element.signalement.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteSignalementPost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addSignalementPost(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    } 
    const {id} = this.props.match.params;
    this.loadPost(id);
  };

  likeReponse = async (element) => {
    if(element.like.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteLikeReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addLikeReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    const {id} = this.props.match.params;
    this.loadReponse(id);
  };
  
  dislikeReponse = async (element) => {
    if(element.dislike.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteDislikeReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addDislikeReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    } 
    const {id} = this.props.match.params;
    this.loadReponse(id);
  };

  signalerReponse = async (element) => {
    if(element.signalement.includes(localStorage.getItem("_id"))){
      try{
        await API.deleteSignalementReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    }
    else{
      try{
        await API.addSignalementReponse(element._id);
      }catch(e){
        alert(e.response.data.text)
      }
    } 
    const {id} = this.props.match.params;
    this.loadReponse(id);
  };

  send = async () => {
    if(API.isAuth()){
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
    }
    else{
      ReactDOM.render(
        React.createElement('div', {}, ),
        document.getElementById("reponseAddError")
      );
      ReactDOM.render(
        React.createElement('div', {}, 
        <p className="error">Attention vous n'êtes pas connecté. Connectez vous pour pouvoir écrire une réponse. <br></br> (Copier Coller votre réponse pour ne pas la perdre !)</p>
        ),
        document.getElementById("errorSubmit")
      );
    }
  };

  owner = async () => {
    if(this.state.post.userId._id == localStorage.getItem("_id")){
      if(this.state.post.imageUrl){
        ReactDOM.render(
          React.createElement('div', {}, 
          <React.Fragment>
            <button type="button" class="btn btn-default btn-sm btn-info" onClick={() => this.updatePostView()}>
                <span class="glyphicon glyphicon-exclamation-sign"></span> Modifier !
            </button>
            <button type="button" class="btn btn-default btn-sm btn-danger" onClick={() => this.deleteImage()}>
              <span class="glyphicon glyphicon-exclamation-sign"></span> Supprimer la photo !
            </button>
          </React.Fragment>),
          document.getElementById("owner")
        );
      }
      else{
        ReactDOM.render(
          React.createElement('div', {}, 
            <button type="button" class="btn btn-default btn-sm btn-info" onClick={() => this.updatePostView()}>
                <span class="glyphicon glyphicon-exclamation-sign"></span> Modifier !
            </button>
          ),
          document.getElementById("owner")
        );
      }

    }
  };

  cancel = async () => {
    if(this.state.oldUrl && this.state.oldUrl != ""){
      //on suprimé la l'image enregistré en Stockage mais qui a été annulé par l'utilisateur
      Storage.deleteImage(this.state.post.imageUrl);
      this.setState({
        oldUrl: "",
        post: {
              ...this.state.post,
              imageUrl: this.state.oldUrl
        }
      })
    }
    this.owner();
  };

  loadAllCategorie = async () => {
    const res = API.getAllCategorie();
    this.setState({
        allCategorie: (await res).data
    });
  };

  updatePostView = async () => {
    const { post, allCategorie } = this.state;
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
            {allCategorie.map(element => {
                          return(<option value={element.nom}>{element.nom}</option>)
                        }
                      )
            }
        </FormControl>
                
        <div id="categorieError"></div>
      </FormGroup>
      <FormGroup controlId="image" bsSize="large">
                <ControlLabel>Image (Non obligatoire)</ControlLabel>
                <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e)} />
                <img src={post.imageUrl} alt="upload-image" className="process__image  img-responsive center-block" />    
                <div id="chargementImage"></div>
      </FormGroup>
     
      <Button onClick={this.updatePost} block bsSize="large" type="submit">
        Poster
      </Button>
      <div id="errorSubmit"></div>
      <Button onClick={this.cancel} block bsSize="large" type="submit">
        Annuler
      </Button>
    </div>),
      document.getElementById("owner")
    );
  };

  deleteImage = async () => {
    const { post } = this.state
    const token = localStorage.getItem("token")
    const postId = post._id;
    const description = post.description;
    const libelle = post.libelle;
    const categorie = post.categorie;
    const {data} = await API.updatePost({ postId, description, libelle, categorie, token });
    if(data.text == "Succès"){
      Storage.deleteImage(this.state.post.imageUrl);
      alert("L'image a été supprimée !")
      document.getElementById("postImage").remove();
      const {id} = this.props.match.params;
      this.loadPost(id);
    }
  };

  uploadImage= async (e) => {
    // mise en chargement => on ne pourra pas poster tant que la photo n'a pas été chargé
    ReactDOM.render(
      React.createElement('div', {}, <p className="text-success">L'image est en cours de traitement ...</p>),
      document.getElementById("chargementImage")
    )
    this.setState({wait: true});

    let currentImageName = "firebase-image-"+ localStorage.getItem("_id")+ "-" + Date.now();

    
    let uploadImage = Storage.create(currentImageName,e);

    uploadImage.on('state_changed',
    (snapshot) => { },
    (error) => {
      alert(error);
    },
    () => {
          
          Storage.getUrlImage(currentImageName).then(url => {
            this.setState({
              oldUrl: this.state.post.imageUrl,
              post: {
                    ...this.state.post,
                    imageUrl: url
              },
              wait: false
            })
            this.updatePostView();
          alert("L'image a était enregistré");
          ReactDOM.render(
            React.createElement('div', {}, ),
            document.getElementById("errorSubmit")
          )
          ReactDOM.render(
            React.createElement('div', {}, ),
            document.getElementById("chargementImage")
          )
      })
    })
    
  }

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
    const { post, wait } = this.state;
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
    if (!post.categorie || post.categorie == "..." || post.categorie.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir votre categorie !</p>),
        document.getElementById("categorieError")
      )
      valide = false;
    }
    
    if(valide && !wait){
      try {
        const token = localStorage.getItem("token")
        const postId = post._id;
        const description = post.description;
        const libelle = post.libelle;
        const categorie = post.categorie;
        if(post.imageUrl){
          const { data } = await API.updatePost({ postId, description, libelle, categorie, token, imageUrl: post.imageUrl }); 
          if(data.text == "Succès"){
            const {id} = this.props.match.params;
            this.loadPost(id);
            if(this.state.oldUrl == this.state.post.imageUrl || this.state.oldUrl == "" || this.state.oldUrl == undefined){
              alert("Le post a bien était modifier !");
            }
            else{
              // on supprime l'ancienne photo du stockage
              Storage.deleteImage(this.state.oldUrl);
              this.setState({
                oldUrl: ""
              });
              
              
              alert("Le post a bien était modifier ! L'ancienne image a été suppimé.");
            }
            ReactDOM.render(
              React.createElement('div', {}, 
              <img id="postImage" src={post.imageUrl} alt="upload-image" className="process__image img-responsive center-block" />    
              ),
              document.getElementById("image")
            );
          }else{
            ReactDOM.render(
              React.createElement('div', {}, <p className="error"> Erreur de modification !</p>),
              document.getElementById("errorSubmit")
            )
          }
        }
        else{
          const { data } = await API.updatePost({ postId, description, libelle, categorie, token }); 
          if(data.text == "Succès"){
            alert("Le post a bien était modifier !");
            this.owner();
          }else{
            ReactDOM.render(
              React.createElement('div', {}, <p className="error"> Erreur de modification !</p>),
              document.getElementById("errorSubmit")
            )
          }
        }
        
      } catch (error) {
        console.error(error);
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> {error.message} !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
    else{
      if(wait){
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> La photo n'a pas fini de charger !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
  };
  
  //recherche

  filterPost = (e) => {
    
    // input de recherche
    const event = e.target
    this.setState({valueResearch: event.value});
    
    if(event.value){
      var updatedReponses = this.state.reponsesLoad;
      updatedReponses = updatedReponses.filter(function(item){
        return (item.libelle.toLowerCase().search(event.value.toLowerCase()) !== -1);//dans le libelle
      });
      this.setState({reponses: updatedReponses});
    }
    else{
      this.setState({reponses: this.state.reponsesLoad});
    }
  };

  handleSelect = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };

  render() {
    const { post, reponseAdd, reponses, valueResearch } = this.state;
    return (
      <Grid>
       <Row mt>
        <Navbar valueResearch = {valueResearch} cacheCategorie = {true} filter={this.filterPost} select={this.handleSelect}/>
          <Col md={9}>
      <div className="Dashboard">
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        
      </div>

      <div class="list-group">
        <a class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{post.description}</h5>
            <small>Posté par {post.userId.pseudo} le {(post.create.split(':')[0] +"h"+ post.create.split(':')[1]).split("T")[0] + " à " + (post.create.split(':')[0] +"h"+ post.create.split(':')[1]).split("T")[1]}</small>
          </div>
          <p class="mb-1">{post.libelle}</p>
          <div id="image"></div>
          <small>Categorie : {post.categorie}</small>
          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.likePost(post);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
            <span class="glyphicon glyphicon-thumbs-up"></span> Like {post.like.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.dislikePost(post);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {post.dislike.length}
          </button>
          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.signalerPost(post);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
            <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {post.signalement.length}
          </button>
        </a>
        <div id="owner"></div>
        
      </div>

      <div className="Dashboard">
        <h2>Toutes les reponses :</h2>
        
      </div>

      {reponses.map(element => {if(this.state.selectLike <= element.like.length){
                return(
                  <div class="list-group">
                  <a class="list-group-item list-group-item-action active">
                    <div class="d-flex w-100 justify-content-between">
                      <small>Posté par {element.userId.pseudo} le {(element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[0] + " à " + (element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[1]}</small>
                    </div>
                    <p class="mb-1">{element.libelle}</p>
                  </a>
                  <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.likeReponse(element);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
                      <span class="glyphicon glyphicon-thumbs-up"></span> Like {element.like.length}
                    </button>
                    <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.dislikeReponse(element);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
                      <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {element.dislike.length}
                    </button>
                    <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.signalerReponse(element);
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
                      <span class="glyphicon glyphicon-exclamation-sign"></span> Signaler {element.signalement.length}
                    </button>
                </div>
                )
              }
      
             })
            }
      
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
        <div id="errorSubmit"></div>
        
      </div> 
      
      </Col>
    </Row>
  </Grid>
    );
  }
}