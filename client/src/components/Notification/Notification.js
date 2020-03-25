import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import Navbar from '../../components/Navbar';

import API from "../../utils/API";

export class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allNotification: [],
      selectCategorie: "",
      selectLike: "0"
    };

    this.filterPost = this.filterPost.bind(this);
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

  post = () => {
    window.location = "/createPost";
  };

  showNotification = async (element) => {
    const res = API.notificationVue(element._id);
  }

  loadAllNotification = async () => {
    const res = API.getAllNotification();
    this.setState({
        allNotification: (await res).data,
        allNotificationLoad: (await res).data
    });
  };

  //recherche

  filterPost = (e) => {
    
    // input de recherche
    const event = e.target
    this.setState({valueResearch: event.value});
    if(event.value){
      var updatedNotifications = this.state.allNotificationLoad;
      updatedNotifications = updatedNotifications.filter(function(item){
        return ((item.postId.description.toLowerCase().search(event.value.toLowerCase()) !== -1) || (item.postId.libelle.toLowerCase().search(event.value.toLowerCase()) !== -1));//dans le titre ou le libelle
      });
      this.setState({allNotification: updatedNotifications});
    }
    else{
      this.setState({allNotification: this.state.allNotificationLoad});
    }
  };

  handleSelect = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };

  render() {
    const { allNotification, valueResearch } = this.state;
    return (

      <Grid>
        <Row mt>
        <Navbar valueResearch = {valueResearch} filter={this.filterPost} select={this.handleSelect}/>
          <Col md={9}>
      <div className="Dashboard">
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
      </div>
      {allNotification.map(element => {
          if((this.state.selectCategorie == element.postId.categorie || this.state.selectCategorie == "") && (this.state.selectLike <= element.postId.like.length)){
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
        }
      )
      
        
      }
      
      </Col>
      </Row>
    </Grid> 
    );
  }
}