import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { getAllCategories, createCategory, deleteCategory } from "../../actions/categoryActions";
import ModalCategory from "../layout/ModalCategory"
import ModalService from "../layout/ModalService"

class Categories extends Component {
    constructor() {
      super();
      this.state = {
        modalCreateCategory: false,
        modalCreateService: false,
        filtersCategory: [],
        errors: {}
      };
      this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }

      this.setState({
        filtersCategory: nextProps.category.categories
      })
    }
    componentDidMount() {
      this.setState({
        filtersCategory: this.props.category.categories
      });
      this.props.getAllCategories()
    }

    modalToggleCategory = () => {
      this.setState({ModalCategory: !this.state.modalCreateCategory})
    };

    delCategory = (_id) => {
      this.props.deleteCategory(_id)

      this.props.getAllCategories()
    }

    handleChange(e) {
      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];

          // If the search bar isn't empty
      if (e.target.value !== "") {
        // Assign the original list to currentList
        currentList = this.props.category.categories;

        // Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter(item => {
                  // change current item to lowercase
          const lc = item.name.toLowerCase();
                  // change search term to lowercase
          const filter = e.target.value.toLowerCase();
                  // check to see if the current list item includes the search term
                  // If it does, it will be added to newList. Using lowercase eliminates
                  // issues with capitalization in search terms and search content
          return lc.includes(filter);
        });
      } else {
        // If the search bar is empty, set newList to original task list
        newList = this.props.category.categories;
      }
      // Set the filtered state based on what our rules added to newList
      this.setState({
        filtersCategory: newList
      });
    }

    modalToggleService = () => {
      this.setState({ ModalService: !this.state.modalCreateService})
    };
    render() {
        const { user } = this.props.auth;
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s2 center-align" style={{ marginTop: '50px' }}>
                  <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text white-text text-darken-1">
                      You are in Categories
                  </p>
                  </h4>
                  { user.role === 'vendedor' &&
                    <ModalCategory onClick={this.modalToggleCategory} status={this.state.modalCreateCategory} />
                  }
                  { user.role === 'vendedor' &&
                    <p 
                      style={{
                        fontFamily: "monospace"
                      }}
                      className="black-text"
                    >Añadir</p>
                  }
                  { user.role === 'vendedor' &&
                    <Link
                      to={`/myservices/${user.id}`}
                      style={{
                        fontFamily: "monospace"
                      }}
                      className="col s5 brand-logo center black-text"
                    >
                      <i className="material-icons">eco</i>
                      Servicios
                    </Link>
                  }
                  

                  
              </div>
              <div className="col s10 center-align" style={{ marginTop: '20px' }}>
              <input type="text" className="input"  onChange={this.handleChange} placeholder="Search..." />
              {this.state.filtersCategory.map( (value, index) => {
                return <div className="col s4 l4 m4 places-holder" key={index}>
                <div className="card hoverable">
                  <div className="card-content mar-bottom">
                      <p className="flow-text grey-text text-darken-1">{value.name}</p>
                  </div>
                  <div className="card-action" style={{ height: '100px' }}>
                    <Link
                      to={`/services/${value._id}`}
                      style={{
                        fontFamily: "monospace"
                      }}
                      className="col s5 brand-logo center black-text"
                    >
                      <i className="material-icons">eco</i>
                      Servicios
                    </Link>
                    { user.role === 'vendedor' &&
                    <React.Fragment>
                      <ModalService onClick={this.modalToggleService} Category={value._id} status={this.state.modalCreateService} />
                    </React.Fragment>
                    }
                    { user.role === 'vendedor' &&
                    <a
                      className="waves-effect waves-light btn"
                      onClick={() => {if(window.confirm('Delete the item?')){this.delCategory(value._id)}}}
                    >
                      <i className="material-icons">delete</i>
                    </a>
                    }
                  </div>
                </div>
                </div>
              })}
            </div>
            </div>
        </div>
        );
    }
}
Categories.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  category: state.category,
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAllCategories, createCategory, deleteCategory }
)(Categories);