import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import ReactDOM from 'react-dom';


import API from "../../utils/API";
import Navbar from '../../components/Navbar';

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
      selectCategorie: "",
      selectLike: "0"
    };

    this.loadAllPost = this.loadAllPost.bind(this);
    this.like = this.like.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.filterPost = this.filterPost.bind(this);
    

    this.loadAllPost();  
  }
  

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

  
  loadAllPost = async () => {
    const res = API.getAllPost();
    this.setState({
      allPost: (await res).data, // les post sue l'on va traiter par la suite pour la recherche
      allPostLoad: (await res).data //on enregistre ce que l'on a recu dans le state
    });
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

  handleSelect = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };
  

  render() {
    const { allPost, valueResearch } = this.state;
    return (
    
      <Grid>
        <Row mt>
        <Navbar valueResearch = {valueResearch} filter={this.filterPost} selectCategorie={this.handleSelect}/>
          <Col md={9}>
            <div className="Dashboard">
              <h1>Polytech Contre le Sexisme</h1>
              <h2>Bienvenue {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
            </div>
            <br/>
            {allPost.map(element => {
              if((this.state.selectCategorie == element.categorie || this.state.selectCategorie == "") && (this.state.selectLike <= element.like.length)){
                return(
                      <div class="list-group">
                        <a href={"post/" + element._id} class="list-group-item list-group-item-action active">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{element.description}</h5>
                            <small>Posté par {element.userId.pseudo} le {element.create}</small>
                          </div>
                          <p class="mb-1">{element.libelle}</p>
                          <small>Categorie : {element.categorie}</small>
                        </a>
                          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.like(element)
                                }
                                else{
                                  window.location = "/login";
                                }
                              }
                            }>
                            <span class="glyphicon glyphicon-thumbs-up"></span> Like {element.like.length}
                          </button>
                          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.dislike(element)
                                }
                                else{
                                  window.location = "/login";
                                }
                              }}>
                            <span class="glyphicon glyphicon-thumbs-down"></span> Dislike {element.dislike.length}
                          </button>
                          <button type="button" class="btn btn-default btn-sm" onClick={() => {
                                if(API.isAuth()){
                                  this.signaler(element)
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
            }
              
            )}
          </Col>
        </Row>
      </Grid>
      
      
    );
  }
}