import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsItems } from "../Utils/ApiUtils";
import { Pagination } from "semantic-ui-react";
import { setNewsFeeds } from "../redux/actions/newsActions";
import defaultImage from "../Asset/defaultImage.jpeg";
import { useHistory } from "react-router-dom";

const Home = () => {
  const newsFeeds = useSelector((state) => state.AllNewsFeeds.data.results);
  const searchTerm = useSelector((state) => state.AllNewsFeeds.searchTerm);
  const totalPages = useSelector((state) => state.AllNewsFeeds.data.total);
  const [keyword, setKeyword] = useState(searchTerm);
  let [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePageChange = async (evt, pageInfo) => {
    let pageNo = evt.target.innerHTML;
    if (evt.target.ariaLabel === "Next item") {
      setActivePage(++activePage);
      const res = await fetchNewsItems(searchTerm, activePage, 10);
      dispatch(setNewsFeeds(res.response));
    } else if (evt.target.ariaLabel === "Previous item") {
      setActivePage(--activePage);
      const res = await fetchNewsItems(searchTerm, activePage, 10);
      dispatch(setNewsFeeds(res.response));
    } else {
      setActivePage(pageNo);
      const res = await fetchNewsItems(searchTerm, pageNo, 10);
      dispatch(setNewsFeeds(res.response));
    }
  };

  const handleKeywordClick = async (title) => {
    setKeyword(title);
    const res = await fetchNewsItems(title, activePage, 10);
    if (res.response.results && res.response.results.length > 0) {
      dispatch(setNewsFeeds(res.response));
    }
  };

  useEffect(() => {
    if (!newsFeeds) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, []);

  return (
    <>
      {!newsFeeds && (
        <h1>Oops... No records found, redirecting you to search!!</h1>
      )}
      {newsFeeds && (
        <div>
          <div class="news-card-rsltSrch">
            {searchTerm !== "" && (
              <label className="news-card-title">Results for {keyword}</label>
            )}
            <a href="/" class="ui right labeled icon">
              <i class="left arrow icon"></i>
              Back to search
            </a>
          </div>
          <div className="news-card-wp">
            <label className="news-card-wp--heading">Results</label>
            <div className="news-card-area">
              {newsFeeds &&
                newsFeeds.map((item, index) => {
                  return (
                    <div className="news-card">
                      <div className="news-card--thumbnail">
                        <a href={item.webUrl} target="_blank">
                          <img
                            src={
                              item.fields.thumbnail
                                ? item.fields.thumbnail
                                : defaultImage
                            }
                            alt="thumbnailImage"
                          />
                        </a>
                      </div>
                      <div className="news-card--details">
                        <a
                          className="news-card--headline"
                          href={item.webUrl}
                          target="_blank"
                        >
                          {item.fields.headline}
                        </a>
                        <div>
                          {item.tags &&
                            item.tags.map((tag, index) => {
                              return (
                                <button
                                  className="news-card--keyword"
                                  onClick={(evt) =>
                                    handleKeywordClick(tag.webTitle)
                                  }
                                >
                                  {tag.webTitle}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {newsFeeds && newsFeeds.length >= 10 && (
            <div className="pagination-container">
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages || newsFeeds.length}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
