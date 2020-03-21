import React from "react";
import { Button, Row, Col, Grid } from "react-bootstrap";
import Navbar from '../../components/Navbar';

import API from "../../utils/API";

export class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
      selectCategorie: "",
      selectLike: "0"
    };

    this.filterPost = this.filterPost.bind(this);
    this.loadAllPost = this.loadAllPost.bind(this);
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

  deletePost = async (post) => {
    await API.deletePost(post._id);
    this.loadAllPost();
  };

  signalementDesc = () => {
    const { allPost } = this.state;  
    allPost.sort(function (a, b) {
                    return b.signalement.length - a.signalement.length;
                    });
    this.setState({
        allPost
        });
    };

    signalementAsc = () => {
        const { allPost } = this.state;  
        allPost.sort(function (a, b) {
                        return a.signalement.length - b.signalement.length;
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
        <Navbar valueResearch = {valueResearch} filter={this.filterPost} selectCategorie={this.handleSelect}/>
          <Col md={9}>
      <div className="Dashboard">
        <h1>Admin</h1>
        <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
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
                              <small>Posté par {element.userId.pseudo} le {element.create}</small>
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
}