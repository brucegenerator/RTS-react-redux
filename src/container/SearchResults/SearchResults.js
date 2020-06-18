import React from 'react';
import './style.css';

const SearchResults = (props) => {

    return (
    <div 
        className="articles" 
        key={props.id}>
            <h6>Title: {props.title}</h6>
            <h6>Author: {props.author}</h6>
            <a href={props.link}>
            <h6>Link: {props.link}</h6>
            </a>
            {/* <h6>Created: {props.created}</h6> */}
    </div>
    )
}

export default SearchResults;