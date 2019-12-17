import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllServices, deleteService } from "../../actions/serviceActions"
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
      this.props.getAllServices(this.props.match.params.Category)
    }

    buy = (_id) => {
      alert("estamos procesando tu transaccion esto puede demorar 1000 años")
    }

    getImage(type){
      axios.get(`https://api.unsplash.com/search/photos?query=${type}&client_id=d3a566b6b9638122eee77f216344dcb44f053734eab677fc1c36d045cf26c260`)
      .then(response => {
          console.log(response)
      })
      .catch(e => console.log(e.message))
    }

    render() {
        const { user } = this.props.auth;
        const { services } = this.props.service
        console.log(services)
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                  <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text white-text text-darken-1">
                      You are in Services
                  </p>
                  </h4>
              </div>
            </div>
            <div className="row">
              {services.map( (value, index) => {
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
  getAllServices: PropTypes.func.isRequired,
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
  { getAllServices }
)(Services);