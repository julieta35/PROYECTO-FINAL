import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyServices, deleteService } from "../../actions/serviceActions"
import axios from "axios"

class Services extends Component {
    constructor() {
      super();
      this.state = {
        errors: {}
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
    componentDidMount() {
      this.props.getMyServices(this.props.match.params.User)
    }

    buy = (_id) => {
      alert("estamos procesando tu transaccion esto puede demorar 1000 años")
    }

    render() {
        const { user } = this.props.auth;
        const { myServices } = this.props.service
        console.log(services)
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                  <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text white-text text-darken-1">
                      You are in My Services
                  </p>
                  </h4>
              </div>
            </div>
            <div className="row">
              {myServices.map( (value, index) => {
                return <div className="col s4 l4 m4 places-holder" key={index}>
                <div className="card hoverable" >
                  <div className="card-content mar-bottom">
                    <p className="flow-text grey-text text-darken-1">{value.name}</p>
                    <p className="flow-text black-text">${value.prize}</p>
                    <p className="flow-text grey-text text-darken-1">{value.city}</p>
                  </div>
                  <div className="card-action">
                    <a
                      className="waves-effect waves-light btn"
                      onClick={() => {this.buy(value._id)}}
                    >
                      <i className="material-icons">shopping_cart</i>
                    </a>
                    <a
                      className="waves-effect waves-light btn"
                      onClick={() => {this.props.deleteService(value._id)}}
                    >
                      <i className="material-icons">trash</i>
                    </a>
                  </div>
                </div>
                </div>
              })}
            </div>
        </div>
        );
    }
}
Services.propTypes = {
  getMyServices: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    service: state.service,
    auth: state.auth,
    errors: state.errors
});
export default connect(
  mapStateToProps,
  { getMyServices }
)(Services);