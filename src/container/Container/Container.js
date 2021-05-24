import React, { Component } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";

import "./Container.css";
import axios from "axios";
import { connect } from "react-redux";

class Container extends Component {
  state = {
    value: "",
    result: [],
  };

  onSubmit = (query) => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=" + query + "&hitsPerPage=5")
      .then((res) => {
        this.setState({
          result: res.data.hits,
        });
      })
      .catch((err) => console.log(err));
  };

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  helperForm = (event) => {
    event.preventDefault();
    this.onSubmit(this.state.value);
  };

  render() {
    return (
      <div className="background">
        <SearchForm
          clicked={this.helperForm}
          changed={this.onChange}
          value={this.state.value}
        />

        <button
          className="save-search-button"
          onClick={() => this.props.savedSearch(this.state.value)}
        >
          Save Search
        </button>

        <ul>
          {this.props.reduxSearchTerms.map((i, index) => (
            <li
              className="saved-search"
              key={index}
              onClick={() => this.props.deleteSearch(i.id)}
            >
              {i.value}
            </li>
          ))}
        </ul>

        {this.state.result.map((item) => (
          <SearchResults
            id={item.objectID}
            title={item.title}
            link={item.url}
            author={item.author}
            key={item.objectID}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reduxSearchTerms: state.searchTerms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savedSearch: (search) =>
      dispatch({ type: "GET_SEARCH_TERMS", payload: search }),
    deleteSearch: (id) => dispatch({ type: "DELETE_SEARCH_TERMS", id: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
