import React from "react";
import API from "../utils/API.js";
import { Route, Redirect } from "react-router-dom";

const AdminRoute2 = ({ component: Component, ...rest }) => (
  /*<Route {...rest} render= {Admin} />*/

  <Route
    {...rest}
    render={(props) => {
      API.isAdmin().then(res => {
        if (res === false) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      })
      
    }}
  />
);



export class AdminRoute extends React.Component {
  state = {
    loading: true,
    isAdmin: false,
  }
  componentDidMount() {
    API.isAdmin().then(res => {
      this.setState({
        loading: false,
        isAdmin: res.data.isAdmin,
      });
    });
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={(props) => {
            if (this.state.isAdmin === false) {
              return <Redirect to="/dashboard" />;
            } else {
              return <Component {...props} />;
            }  
          }}
        />
      )
    }
  }
}