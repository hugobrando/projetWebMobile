import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import ReactDOM from 'react-dom';


import API from "../../utils/API";
import Navbar from '../../components/Navbar';

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
    
      <Grid>
        <Row mt>
        <Navbar/>
          <Col md={9}>
            <div className="Dashboard">
              <h1>Polytech Contre le Sexisme</h1>
              <h2>Bienvenue {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
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
            </div>
            )}
          </Col>
        </Row>
        </Grid>
      
      
    );
  }
}