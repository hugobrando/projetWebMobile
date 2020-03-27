import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import Navbar from '../../components/Navbar';
import ReactDOM from 'react-dom';


import API from "../../utils/API";

export class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
      allReponse: [],
      selectCategorie: "",
      selectLike: "0",
      showReponse: false
    };

    this.filterPost = this.filterPost.bind(this);
    this.loadAllPost = this.loadAllPost.bind(this);
    this.loadAllReponse = this.loadAllReponse.bind(this);
    this.showReponse = this.showReponse.bind(this);
    this.showPost = this.showPost.bind(this);
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

  loadAllPost = async () => {
    const res = API.getAllPostSignaled();
    this.setState({
      allPost: (await res).data,
      allPostLoad: (await res).data
    });
  };

  loadAllReponse = async () => {
    const res = API.getAllReponseSignaled();
    this.setState({
      allReponse: (await res).data,
      allReponseLoad: (await res).data
    });
  };

  deletePost = async (post) => {
    await API.deletePost(post._id);
    this.loadAllPost();
  };

  deleteReponse = async (reponse) => {
    await API.deleteReponse(reponse._id);
    this.loadAllReponse();
  };

  signalementDesc = () => {
    if(!this.state.showReponse){
      const { allPost } = this.state;  
      allPost.sort(function (a, b) {
                      return b.signalement.length - a.signalement.length;
                      });
      this.setState({
          allPost
          });
    }
    else{
      const { allReponse } = this.state;  
      allReponse.sort(function (a, b) {
                      return b.signalement.length - a.signalement.length;
                      });
      this.setState({
        allReponse
          });
    }
    
    };

    signalementAsc = () => {
      if(!this.state.showReponse){
        const { allPost } = this.state;  
        allPost.sort(function (a, b) {
                        return a.signalement.length - b.signalement.length;
                        });
        this.setState({
            allPost
            });
      }
      else{
        const { allReponse } = this.state;  
        allReponse.sort(function (a, b) {
                        return a.signalement.length - b.signalement.length;
                        });
        this.setState({
          allReponse
            });
      }
        
    };

        
  //recherche

  filterPost = (e) => {
    
    // input de recherche
    const event = e.target
    this.setState({valueResearch: event.value});
    if(event.value){
      var updatedPosts = this.state.allPostLoad;
      updatedPosts = updatedPosts.filter(function(item){
        return ((item.description.toLowerCase().search(event.value.toLowerCase()) !== -1) || (item.libelle.toLowerCase().search(event.value.toLowerCase()) !== -1));//dans le titre ou le libelle
      });
      this.setState({allPost: updatedPosts});
    }
    else{
      this.setState({allPost: this.state.allPostLoad});
    }
  };

  filterReponse = (e) => {
    
    // input de recherche
    const event = e.target
    this.setState({valueResearch: event.value});
    if(event.value){
      var updatedReponse = this.state.allReponseLoad;
      updatedReponse = updatedReponse.filter(function(item){
        return (item.libelle.toLowerCase().search(event.value.toLowerCase()) !== -1);//dans le libelle
      });
      this.setState({allReponse: updatedReponse});
    }
    else{
      this.setState({allReponse: this.state.allReponseLoad});
    }
  };

  handleSelect = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };


  //show reponse or post

  showReponse = () => {
    this.loadAllReponse();
    this.setState({showReponse: true});
  };

  showPost = () => {
    this.loadAllPost();
    this.setState({showReponse: false});
  };


  render() {
    const { allPost, valueResearch, showReponse, allReponse } = this.state;
    if(!showReponse){
      return (
        <Grid>
          <Row mt>
          <Navbar valueResearch = {valueResearch} filter={this.filterPost} select={this.handleSelect}/>
            <Col md={9}>
        <div className="Dashboard">
          <h1>Admin</h1>
          <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
          <Button block bsSize="small" type="submit" onClick={this.showReponse}>
                Voir les réponses Signalés
          </Button>
          <Button block bsSize="small" type="submit" onClick={this.signalementDesc}>
                Posts signalés descendants
          </Button>
          <Button block bsSize="small" type="submit" onClick={this.signalementAsc}>
                Posts signalés ascendants
          </Button>
        </div>
        {allPost.map(element => {
                      if((this.state.selectCategorie == element.categorie || this.state.selectCategorie == "") && (this.state.selectLike <= element.like.length)){
                        return(
                          <div class="list-group">
                            <a href={"post/" + element._id} class="list-group-item list-group-item-action active">
                              <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{element.description}</h5>
                                <small>Posté par {element.userId.pseudo} le {(element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[0] + " à " + (element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[1]}</small>
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
                            
                            
                            
                          </div>
                        )
                      }
                    }
                )
              }
            </Col>
          </Row>
        </Grid>        
      );
    }
    else{
      return(
      <Grid>
        <Row mt>
        <Navbar valueResearch = {valueResearch} filter={this.filterReponse} select={this.handleSelect}/>
          <Col md={9}>
      <div className="Dashboard">
        <h1>Admin</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
        <Button block bsSize="small" type="submit" onClick={this.showPost}>
              Voir les posts Signalés
        </Button>
        <Button block bsSize="small" type="submit" onClick={this.signalementDesc}>
              Réponses signalés descendants
        </Button>
        <Button block bsSize="small" type="submit" onClick={this.signalementAsc}>
              Réponses signalés ascendants
        </Button>
      </div>
      {allReponse.map(element => {
                    if(this.state.selectLike <= element.like.length){
                      return(
                        <div class="list-group">
                          <a class="list-group-item list-group-item-action active">
                            <div class="d-flex w-100 justify-content-between">
                              <small>Posté par {element.userId.pseudo} le {(element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[0] + " à " + (element.create.split(':')[0] +"h"+ element.create.split(':')[1]).split("T")[1]}</small>
                            </div>
                            <p class="mb-1">{element.libelle}</p>
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
                            <button type="button" class="btn btn-default btn-sm btn-danger" onClick={() => this.deleteReponse(element)}>
                              <span class="glyphicon glyphicon-exclamation-sign"></span> Supprimer !
                            </button>
                        </div>
                      )
                    }
                  }
              )
            }
          </Col>
        </Row>
      </Grid> 
      );
      
    }
    
  }
}