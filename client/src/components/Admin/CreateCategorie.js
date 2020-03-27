import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Row, Col, Grid  } from "react-bootstrap";
import API from "../../utils/API";
import ReactDOM from 'react-dom';
import Navbar from '../../components/Navbar';


export class CreateCategorie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            allCategorie: []
          };

        this.handleChange = this.handleChange.bind(this);
        this.loadAllCategorie = this.loadAllCategorie.bind(this);
        this.loadAllCategorie();
    };

    
    loadAllCategorie = async () => {
        const res = API.getAllCategorie();
        this.setState({
            allCategorie: (await res).data
        });
    };
  

  send = async () => {
    const { nom } = this.state;
    //reinitialise les messages d'erreur
    ReactDOM.render(
        React.createElement('div', {}, ),
        document.getElementById("descriptionError")
    );
    ReactDOM.render(
        React.createElement('div', {}, ),
        document.getElementById("errorSubmit")
    );

    //traite l'ajout
    if (!nom || nom.length === 0){
      ReactDOM.render(
        React.createElement('div', {}, <p className="error">Vous avez oubliez de saisir le nom de la categorie !</p>),
        document.getElementById("descriptionError")
      )
    }
    else{
      try {
        const token = localStorage.getItem("token")
        const { data } = await API.createCategorie({ nom, token });        
        this.setState({nom: ""});
        this.loadAllCategorie();
      } catch (error) {
        console.error(error);
        ReactDOM.render(
          React.createElement('div', {}, <p className="error"> {error.response.data.text} !</p>),
          document.getElementById("errorSubmit")
        )
      }
    }
  };
  homePage = () => {
    window.location = "/";
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { nom, allCategorie } = this.state;
    return (
      <Grid>
        <Row mt>
        <Navbar cacheResearch = {true}/>
            <h1>Créer une catégorie</h1>
            <h2>Bonjour {localStorage.getItem("prenom")} {localStorage.getItem("nom")}</h2>
          <Col md={5}>
            <div className="Titre">
              <FormGroup controlId="nom" bsSize="large">
                <ControlLabel>Nom de la catégorie</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={nom}
                  onChange={this.handleChange}
                  placeholder="Ajouter une catégorie"
                />
                <div id="descriptionError"></div>
              </FormGroup>       
            
              <Button onClick={this.send} block bsSize="large" type="submit">
                Ajouter
              </Button>
              <div id="errorSubmit"></div>
            </div>
          </Col>
          <Col md={4}>
            {allCategorie.map(element => {
                            return(
                                <div class="list-group">
                                <a class="list-group-item list-group-item-action active">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">{element.nom}</h4>
                                </div>
                                </a>
                                </div>
                            )
                       
                        }
                    )  
                }
           </Col>
        </Row>
    </Grid> 
    );
  }
}