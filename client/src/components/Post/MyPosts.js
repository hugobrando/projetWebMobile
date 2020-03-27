import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import Navbar from '../../components/Navbar';

import API from "../../utils/API";

export class MyPosts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
      selectCategorie: "",
      selectLike: "0"
    };

    this.loadAllMyPosts = this.loadAllMyPosts.bind(this);
    this.filterPost = this.filterPost.bind(this);
    this.loadAllMyPosts();
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

  loadAllMyPosts = async () => {
    const res = API.getAllMyPosts();
    this.setState({
      allPost: (await res).data,
      allPostLoad: (await res).data
    });
  };

  likeDesc = () => {
    const { allPost } = this.state;  
    allPost.sort(function (a, b) {
                    return b.like.length - a.like.length;
                    });
    this.setState({
        allPost
        });
    };

  likeAsc = () => {
      const { allPost } = this.state;  
      allPost.sort(function (a, b) {
                      return a.like.length - b.like.length;
                      });
      this.setState({
          allPost
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
        <Navbar valueResearch = {valueResearch} filter={this.filterPost} select={this.handleSelect}/>
          <Col md={9}>
            <div className="Dashboard">
              <h1>Mes Posts</h1>
              <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
              <Button block bsSize="small" type="submit" onClick={this.likeDesc}>
                    Posts liké descendants
              </Button>
              <Button block bsSize="small" type="submit" onClick={this.likeAsc}>
                    Posts liké ascendants
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