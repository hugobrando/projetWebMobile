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
            this.state={connect: "Se déconnecter",
            allNotification: [],
            allCategorie: []
            }
        }
        else{
            this.state={connect: "Se connecter", 
            allNotification: [], 
            allCategorie: []
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.cacheResearch = this.cacheResearch.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.isAdmin();
        this.loadAllCategorie = this.loadAllCategorie.bind(this);
        this.loadAllCategorie();
        this.loadAllNotification = this.loadAllNotification.bind(this);
        this.loadAllNotification();
    };

    loadAllCategorie = async () => {
        const res = API.getAllCategorie();
        this.setState({
            allCategorie: (await res).data
        });
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

    ajoutCategorie = async () => {
        if(await API.isAdmin()){
          window.location = "/createCategorie";
        };
    }

      
    isAdmin = async () => {
        if((await API.isAdmin()).data.isAdmin){
            ReactDOM.render(
            React.createElement('div', {}, 
            <React.Fragment>
                <Button block bsSize="large" type="submit" className="active" onClick={this.adminPage}>
                Admin
                </Button>
                <Button block bsSize="large" type="submit" className="active" onClick={this.ajoutCategorie}>
                Ajouter catégorie
                </Button>
            </React.Fragment>
            ),
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
        this.props.select(e);
    };


    cacheResearch = () => {
        if(this.props.cacheResearch){
            document.getElementById("research").remove();
        }
    };

    cacheCategorie = () => {
        if(this.props.researchForReponse){
            document.getElementById("selectCategorie").remove();
            document.getElementById("selectReponse").remove();
        }
    };
    

render() {
    const { allNotification, connect,  allCategorie} = this.state
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
                        <select class="form-control" id="selectReponse"  onChange={this.handleSelect}>
                            <option value = "0">Tout nombre de réponses</option>
                            <option value = "5">+5 réponses</option>
                            <option value = "10">+10 réponses</option>
                            <option value = "20">+20 réponses</option>
                            <option value = "50">+50 réponses</option>
                            <option value = "100">+100 réponses</option>
                        </select>
                        <br/>
                        <select class="form-control" id="selectCategorie" onChange={this.handleSelect}>
                            <option value = "">Toutes Catégories</option>
                            {allCategorie.map(element => {
                                return(<option value={element.nom}>{element.nom}</option>)
                                    }
                                )
                            }
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