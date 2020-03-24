import React from "react";
import { Component } from 'react';
import { Image,Button, Col, Grid } from "react-bootstrap";
import ReactDOM from 'react-dom';
import API from "../utils/API";
import icon from '../IconPCS.png';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        if(API.isAuth()){
            this.state={connect: "Se déconnecter", allNotification: [], notifNonVu : "0"}
        }
        else{
            this.state={connect: "Se connecter", allNotification: [], notifNonVu : "0"}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.cacheResearch = this.cacheResearch.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.isAdmin();

        this.loadAllNotification = this.loadAllNotification.bind(this);
        this.loadAllNotification();
    };

     loadAllNotification = async () => {
    const res = API.getAllNotification();
    this.setState({
        allNotification: (await res).data,
        allNotificationLoad: (await res).data
    });
  };

    componentDidMount(){
        this.cacheResearch();
        this.cacheCategorie();
    }

    disconnect = () => {
        if(this.state.connect == "Se déconnecter"){
            API.logout();
            window.location = "/";
            this.setState({connect: "Se connecter"});
        }else{
            window.location = "/login";
        }
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

    myPosts = () => {
    window.location = "/myPosts";
    };

    homePage = () => {
    window.location = "/";
    };
    
    adminPage = async () => {
        if(await API.isAdmin()){
          window.location = "/adminPage";
        };
      }

      
    isAdmin = async () => {
        if((await API.isAdmin()).data.isAdmin){
            ReactDOM.render(
            React.createElement('div', {}, 
            <Button block bsSize="large" type="submit" onClick={this.adminPage}>
            Admin
            </Button>),
            document.getElementById("adminButton")
            );
        }
    };

    handleChange = (e) => {
        // Avant : this.setState({temperature: e.target.value});
        this.props.filter(e);
        // la on appelle la fonction qu'on a passer en param lors de l'appel du react.component
    };

    handleSelect = (e) => {
        this.props.selectCategorie(e);
    };


    cacheResearch = () => {
        if(this.props.cacheResearch){
            document.getElementById("research").remove();
        }
    };

    cacheCategorie = () => {
        if(this.props.cacheCategorie){
            document.getElementById("selectCategorie").remove();
        }
    };
    

render() {
    const { allNotification, connect, notifNonVu} = this.state
    var notifNV = 0
    return (
        <div>
            <Col md={3}>
                <Image src={icon} responsive/>
                <nav id="navbar-custom" class="navbar fixed-left" >
                    <div id="research">
                        <div class="navbar-header">
                            <a class="navbar-brand">Filtres</a>
                        </div>
                        <input type="text" class="form-control" id="rechercheInput" placeholder="Rechercher" required value={this.props.valueResearch} onChange={this.handleChange}></input>
                        <br/>
                        <label for="Select1">Tri des posts</label>
                        <br/>
                        <select class="form-control" id="selectLike"  onChange={this.handleSelect}>
                            <option value = "0">Tout nombre de like</option>
                            <option value = "5">+5 likes</option>
                            <option value = "10">+10 likes</option>
                            <option value = "20">+20 likes</option>
                            <option value = "50">+50 likes</option>
                            <option value = "100">+100 likes</option>
                        </select>
                        <br/>
                        <select class="form-control" id="selectCategorie" onChange={this.handleSelect}>
                            <option value = "">Toutes Catégories</option>
                            <option value="Personnel">Personnel</option>
                            <option value="Livre">Livre</option>
                            <option value="Film">Film</option>
                            <option value="Humour">Humour</option>
                            <option value="Citation">Citation</option>
                            <option value="Réseaux">Réseaux</option>
                            <option value="Autre">Autres</option>
                        </select>
                        <br/>
                    </div>
                    <div onLoad={() => this.cacheResearch}>
                        <Button onClick={this.homePage} block bsSize="large" type="submit">
                            Fil d'actualité
                        </Button>
                        <Button block bsSize="large" type="submit" onClick={this.information}>
                            Mes informations
                        </Button>
                        <Button block bsSize="large" type="submit" onClick={this.post}>
                            Poster
                        </Button>
                        <Button block bsSize="large" type="submit" onClick={this.notification} >
                        {allNotification.map(element => {
                            if(element.vue == false){
                                notifNV= notifNV + 1;
                            }    
                            })
                            }
                            Notifications
                        <span class="badge badge-primary badge-pill">{notifNV}</span>
                        
                        </Button>
                        <Button block bsSize="large" type="submit" onClick={this.myPosts}>
                            Mes Posts
                        </Button>
                        <Button  block bsSize="large" type="submit" onClick={this.disconnect}>
                            {connect}
                        </Button>
                        <div id="adminButton">
                        </div>
                    </div>
                    
                </nav>
            </Col>
        </div>
    )}
}
export default Navbar;