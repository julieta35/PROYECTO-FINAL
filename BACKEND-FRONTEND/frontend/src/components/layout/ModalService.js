import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createService } from "../../actions/serviceActions";
import M from "materialize-css";
import classnames from "classnames";
class ModalService extends Component {
    constructor() {
        super();
        this.state = {
          name: "",
          prize: "",
          city: "",
          errors: {}
        };
    }
    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        // If you want to work on instance of the Modal then you can use the below code snippet 
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const serviceData = {
          name: this.state.name,
          prize: this.state.prize,
          city: this.state.city,
          Category: this.props.Category
        };

        this.props.createService(serviceData, this.props.history);

        
    };

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state;
        return (
        <>
            <a
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal2"
            >
            <i className="material-icons">layers</i>
            </a>

            <div
            ref={Modal => {
                this.Modal = Modal;
            }}
            id="modal2"
            className="modal"
            >
            {/* If you want Bottom Sheet Modal then add 
            bottom-sheet class */}
            <div className="modal-content">
                <div className="row">
                    { this.props.Category }
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.message}
                                id="name"
                                type="text"
                            />
                            <label htmlFor="name">Nombre Servicio</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">monetization_on</i>
                            <input
                                onChange={this.onChange}
                                value={this.state.prize}
                                error={errors.message}
                                id="prize"
                                type="text"
                            />
                            <label htmlFor="name">Precio</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">location_city</i>
                            <input
                                onChange={this.onChange}
                                value={this.state.city}
                                error={errors.message}
                                id="city"
                                type="text"
                            />
                            <label htmlFor="name">Ciudad</label>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Crear
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" className="modal-close waves-effect waves-red btn-flat">
                <i className="material-icons">close</i>
                </a>
            </div>
            </div>
        </>
        );
    }
}

ModalService.propTypes = {
    createService: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { createService }
)(ModalService);

