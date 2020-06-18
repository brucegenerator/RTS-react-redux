import React, { Component } from 'react';

import SearchForm from '../../components/SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';

import axios from 'axios';
import { connect } from 'react-redux'

class Container extends Component {
    state = {
        value: '',
        result: [],
        searchTerms: []
    }

    onSubmit = (query) => {
        axios.get("http://hn.algolia.com/api/v1/search?query=" + query)
        .then(res => {
          console.log(res.data.hits)
          this.setState({
              result: res.data.hits,
              searchTerms: this.state.searchTerms.concat(this.state.value)
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
        let id = new Date();
        return (
            <div>
                <SearchForm 
                    clicked={this.helperForm}
                    changed={this.onChange}
                    value={this.state.value} />

                {this.state.searchTerms.map(i => (
                    <ul key={id}>
                        <li>{i}</li>
                    </ul>
                ))}

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
        reduxValue: state.value,
        reduxResult: state.results,
        reduxSearchTerms: state.searchTerms
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);