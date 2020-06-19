import React, { Component } from 'react';

import SearchForm from '../../components/SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';

import axios from 'axios';
import { connect } from 'react-redux'

class Container extends Component {
    state = {
        value: '',
        result: [],
    }

    onSubmit = (query) => {
        axios.get("http://hn.algolia.com/api/v1/search?query=" + query)
        .then(res => {
          this.setState({
              result: res.data.hits,
            })
        })
        .catch(err => console.log(err));
      };

    onChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    helperForm = event => {
        event.preventDefault();
        this.onSubmit(this.state.value);
    }

    render() {
        return (
            <div>
                <SearchForm 
                    clicked={this.helperForm}
                    changed={this.onChange}
                    value={this.state.value} />

                <button onClick={() => this.props.savedSearch(this.state.value)}>Save Search</button>
                
                <ul>
                    {this.props.reduxSearchTerms.map(i => (
                        <li key={i.id} onClick={() => this.props.deleteSearch(i.id)}>{i}</li> 
                ))}
                </ul>

                {this.state.result.map(item => (
                    <SearchResults
                        id={item.objectID}
                        title={item.title}
                        link={item.url}
                        author={item.author}
                        key={item.objectID} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reduxSearchTerms: state.searchTerms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savedSearch: (search) => dispatch({type: 'GET_SEARCH_TERMS', payload: search}),
        deleteSearch: (id) => dispatch({type:'DELETE_SEARCH_TERMS', searchID: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);