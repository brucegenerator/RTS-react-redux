import React from "react";

const SearchForm = (props) => (
  <form onSubmit={props.clicked}>
    <div className="form-group">
      <label htmlFor="search">Search:</label>
      <input 
            onChange={props.changed}
            value={props.value} />
      <br />
      <button onChange={props.changed} onClick={props.clicked}>
        Search
      </button >
    </div>
  </form>
);

export default SearchForm;
