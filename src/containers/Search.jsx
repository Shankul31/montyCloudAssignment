import React, { useState } from "react";
import axios from "axios";
import { setNewsFeeds } from "../redux/actions/newsActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const newsFeeds = useSelector((state) => state);
  const history = useHistory();

  const handleInputChange = (evt) => {
    if (evt.target.value !== "") {
      setSearchTerm(evt.target.value);
    } else {
      setSearchTerm("");
    }
  };

  const handleSubmit = () => {
    fetchNewsFeeds();
    // fetchSuggestions();
    history.push("/home");
  };

  const fetchNewsFeeds = async () => {
    const res = await axios
      .get(
        `https://content.guardianapis.com/search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=1&page-size=10`
      )
      .catch((err) => {
        console.log("Error", err);
      });
    dispatch(setNewsFeeds(res.data.response.results));
  };

  // const fetchSuggestions = async () => {
  //   const res = await axios
  //     .get(
  //       `https://content.guardianapis.com/tags?show-references=${searchTerm}&api-key=test`
  //     )
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  //   console.log("suggestions", res);
  // };
  return (
    <div className="search-container">
      <h1 className="heading">News Lister</h1>
      <div>
        <label htmlFor="search">Enter search text </label>
        {/* <input type="text" onChange={(evt) => handleInputChange(evt)} /> */}
        <div class="ui icon input loading search-input">
          <input
            type="text"
            placeholder="Search..."
            onChange={(evt) => handleInputChange(evt)}
          />
          <i class="search icon hide"></i>
        </div>
        <button
          className={
            searchTerm.length > 0
              ? "ui primary basic button"
              : "ui primary basic button disabled"
          }
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
