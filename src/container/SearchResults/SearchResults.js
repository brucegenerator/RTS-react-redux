import React from 'react';
import './style.css';

const SearchResults = (props) => {

    return (
    <div 
        className="articles" 
        key={props.id}>
            <a href={props.link} target='_blank'>
            <h6>{props.title}</h6>
            </a>
            <h6>by: {props.author}</h6>            
            {/* <h6>Created: {props.created}</h6> */}
    </div>
    )
}

export default SearchResults;