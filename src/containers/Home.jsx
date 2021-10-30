import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const newsFeeds = useSelector((state) => state.AllNewsFeeds.results);

  console.log("new:", newsFeeds);

  return (
    <div>
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
    </div>
  );
};

export default Home;
