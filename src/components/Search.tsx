import React from "react";
import "../App.css";

interface Props {
  search: string;
  setSearch: (query: string) => void;
}

export const Search: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="header">
      <h1 className="title">Contacts</h1>
      <input
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
  );
};

export default Search;
