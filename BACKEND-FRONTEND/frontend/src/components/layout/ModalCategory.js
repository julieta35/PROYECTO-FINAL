import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCategory } from "../../actions/categoryActions";
import M from "materialize-css";
import classnames from "classnames";
class ModalCategory extends Component {
    constructor() {
        super();
        this.state = {
          name: "",
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
        const categoryData = {
          name: this.state.name,
        };
        this.props.createCategory(categoryData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state;
        return (
        <>
            <a
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal1"
            >
            <i className="material-icons">add_to_queue</i>
            </a>

            <div
            ref={Modal => {
                this.Modal = Modal;
            }}
            id="modal1"
            className="modal"
            >
            {/* If you want Bottom Sheet Modal then add 
            bottom-sheet class */}
            <div className="modal-content">
                <div className="row">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.message}
                            id="name"
                            type="text"
                            className={classnames("", {
                            invalid: errors.message
                            })}
                        />
                        <label htmlFor="name">Nombre Categoria</label>
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

ModalCategory.propTypes = {
    createCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { createCategory }
)(ModalCategory);

