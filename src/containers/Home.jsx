import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "semantic-ui-react";

const Home = () => {
  const newsFeeds = useSelector((state) => state.AllNewsFeeds.data.results);
  const searchTerm = useSelector((state) => state.AllNewsFeeds.searchTerm);
  const totalPages = useSelector((state)=>state.AllNewsFeeds.data.total)


  console.log("new:",  totalPages);

  return (
    <div>
      {searchTerm !== "" && <h1>Results for {searchTerm}</h1>}
      {newsFeeds &&
        newsFeeds.map((item, index) => {
          return (
            <div className="news-card">
              <div className="news-card--thumbnail">
                <img src={item.fields.thumbnail} alt="thumbnailImage" />
              </div>
              <div className="news-card--details">
                <a href={item.webUrl} target="_blank">
                  {item.fields.headline}
                </a>
                <div>
                  {item.tags &&
                    item.tags.map((tag, index) => {
                      return (
                        <a href={tag.webUrl} target="_blank">
                          <button>{tag.webTitle}</button>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
        <Pagination defaultActivePage={10} totalPages={totalPages} />
    </div>
  );
};

export default Home;
