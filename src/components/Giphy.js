import React, { useEffect, useState } from "react";
import axios from "axios";
import GiphyDisplay from "./GiphyDisplay";
import LogoImage from "./img/kMFLJfI.png";
import { updateSourceFile } from "typescript";
const GiphyApi = () => {
  const [giphyList, setGiphyList] = useState([]);
  const [giphySearch, setGiphySearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const fetchTrendingData = async () => {
      const result = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
        },
      });
      console.log(result.data.data);
      setGiphyList(result.data.data);
    };
    fetchTrendingData();
  }, []);
  useEffect(() => {
    loadMoreHandler();
  }, [offset]);
  const clickHandler = async (e) => {
    e.preventDefault();
    const result = await axios(
      `https://api.giphy.com/v1/gifs/search?offset=0&limit=20`,
      {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
          q: giphySearch,
        },
      }
    );
    setGiphyList(result.data.data);
    setOffset(20);
    console.log(result);
    setTotalCount(result.data.pagination.total_count);
  };
  const loadMoreHandler = async () => {
    const result = await axios(
      `https://api.giphy.com/v1/gifs/search?offset=${offset}&limit=20`,
      {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
          q: giphySearch,
        },
      }
    );
    setGiphyList((prev) => [...prev, ...result.data.data]);
  };
  const changeHandler = (e) => {
    setGiphySearch(e.target.value);
  };
  const loadMoreImages = () => {
    console.log("loadmoreimage");
    setOffset((prev) => prev + 20);
  };
  const handleScroll = (e) => {
    const bottom =
      Math.ceil(e.target.scrollHeight - e.target.scrollTop) ===
      e.target.clientHeight;
    console.log(
      "bottom",
      Math.ceil(e.target.scrollHeight - e.target.scrollTop),
      e.target.clientHeight
    );
    if (bottom) loadMoreImages();
  };
  return (
    <section className="giphy-app__parent-section">
      <aside id="giphy-app__child-section" onScroll={handleScroll}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <form className="giphy-app__form">
            <img className="giphy-app__logo" src={LogoImage} alt="Giphy logo" />
            <input
              className="giphy-images__search-bar"
              type="text"
              onChange={changeHandler}
              value={giphySearch}
              placeholder="Search all the GIFs"
            />
            <button
              className="giphy-page__search-button"
              type="submit"
              onClick={clickHandler}
              aria-label="Submit"
            >
              <i id="giphy-page__search-icon" className="fa fa-search"></i>
            </button>
          </form>
        </div>
        {totalCount && (
          <div className="Giphy-app__data-totalCount">
            Images Total Count: {offset} / {totalCount}
          </div>
        )}
        <br />
        <GiphyDisplay giphyList={giphyList} />
      </aside>
    </section>
  );
};
export default GiphyApi;
