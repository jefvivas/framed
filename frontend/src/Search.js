import React, { useState, useEffect } from "react";
import axios from "axios";
import normalize from "normalize-text";
import "./Search.css";

function Search() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/movies")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        return (
          normalize(item.enTitle)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          normalize(item.ptTitle).toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, data]);
  return (
    <div className="page-container">
      <div className="page-top">Framed</div>
      <div className="page-content">
        <input
          className="search-input"
          placeholder="Type name here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="search-result">
        <div
          className={`search-suggestion${
            filteredData.length > 0 && filteredData.length !== data.length
              ? "-show"
              : ""
          }`}
        >
          {filteredData.map((item) => (
            <div
              key={item.number}
              className={`content-row${
                filteredData.length > 0 && filteredData.length !== data.length
                  ? "-show"
                  : ""
              }`}
            >
              <h2>{item.enTitle}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
