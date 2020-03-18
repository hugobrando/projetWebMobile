import React from "react";
import { Component } from 'react';
import { Button, Col, Grid } from "react-bootstrap";
import ReactDOM from 'react-dom';

class Navbar extends React.Component {

render() {
    return (
        <div>
            <Col md={3}>
                <nav id="navbar-custom" class="navbar fixed-left">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Filtres</a>
                    </div>
                    <input type="text" class="form-control" id="validationTooltip01" placeholder="Rechercher" required></input>
                    <Button block bsSize="small" type="submit">
                        Rechercher
                    </Button>
                    <div class="checkbox">
                        <label>
                        <input type="checkbox" data-toggle="toggle"></input>
                        Option is enabled
                        </label>
                    </div>
                    <div class="checkbox disabled">
                        <label>
                        <input type="checkbox" disabled data-toggle="toggle"></input>
                        Option is disabled
                        </label>
                    </div>
                    <label for="Select1">tri des posts</label>
                    <select class="form-control" id="Select1">
                        <option>...</option>
                        <option>-10 likes</option>
                        <option>10-20 likes</option>
                        <option>20-50 likes</option>
                        <option>50-100 likes</option>
                        <option>+100 likes</option>
                    </select>
                    <form>
                    <div class="form-group">
                    <label for="formControlRange">Test de filtre</label>
                    <input type="range" class="form-control-range" id="formControlRange"></input>
                    </div>
                    </form>
                    <Button  block bsSize="large" type="submit" onClick={this.disconnect}>
                        Se déconnecter
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.information}>
                        Mes informations
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.post}>
                        Poster
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.notification}>
                        Notifications
                    </Button>
                    <Button block bsSize="large" type="submit" onClick={this.myPosts}>
                        Mes Posts
                    </Button>
                    <div id="adminButton">
                    </div>
                </nav>
            </Col>
        </div>
    )}
}
export default Navbar;