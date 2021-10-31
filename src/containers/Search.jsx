import React, { useState } from "react";
import axios from "axios";
import { setNewsFeeds } from "../redux/actions/newsActions";
import { setUserInput } from "../redux/actions/newsActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsItems } from "../Utils/ApiUtisl";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  // const newsFeeds = useSelector((state) => state);
  const history = useHistory();

  const handleInputChange = (evt) => {
    if (evt.target.value !== "") {
      setSearchTerm(evt.target.value);
      dispatch(setUserInput(evt.target.value));
    } else {
      setSearchTerm("");
    }
  };

  const handleSubmit = () => {
    fetchNewsFeeds();
    // fetchSuggestions();
  };

  const fetchNewsFeeds = async () => {
    const res = await fetchNewsItems(searchTerm, 1, 10);
    if (res.response.results && res.response.results.length > 0) {
      console.log("res", res);
      dispatch(setNewsFeeds(res.response));
      history.push("/home");
    }
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
