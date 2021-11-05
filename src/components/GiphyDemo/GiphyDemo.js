import React, { useEffect, useState, useCallback } from 'react';
import GiphyDisplayPanel from '../GiphyDisplayPanel/GiphyDisplayPanel';
import LogoImage from '../../asssets/img/kMFLJfI.png';
import { searchGifs, fetchGifsTrend } from '../../services/giphy.api';
import { isScrolledToTheBottom } from '../../utils/isScrolledToTheBottom';

const GiphyDemo = () => {
  const [giphyList, setGiphyList] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [giphySearch, setGiphySearch] = useState('');
  const [pagination, setPagination] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // when component did mount, try to show the trending data.
  useEffect(() => {
    setLoading(true);
    fetchGifsTrend(0, 20)
      .then(({ data }) => {
        setGiphyList(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
      });
  }, []);

  // if giphySearch changed, reset the search to show the new result and new pigination
  useEffect(() => {
    if (giphySearch) {
      setLoading(true);
      searchGifs(giphySearch, 0, 20)
        .then(({ data }) => {
          console.log(data);
          setGiphyList(data.data);
          setPagination(data.pagination);
          setLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          setLoading(false);
        });
    }
  }, [giphySearch]);

  // if pagination and pagination.offset !== 0, triggle loadmore
  useEffect(() => {
    if (searchGifs && pagination && !isLoading && pagination.offset !== 0) {
      handleLoadmore();
    }
  }, [pagination]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    setGiphySearch(userInput);
  };

  const handleLoadmore = () => {
    setLoading(true);
    searchGifs(giphySearch, pagination.offset + 20, 20)
      .then(({ data }) => {
        setGiphyList((prev) => [...prev, ...data.data]);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
      });
  };

  const hanldeScroll = (e) => {
    if (!isLoading&&pagination && isScrolledToTheBottom(e,0)) {
      console.log('bottom');
      const newOffset =
        pagination.offset + 20 > pagination.total_count
          ? pagination.total_count
          : pagination.offset + 20;
      setPagination((pre) => {
        return {
          ...pre,
          offset: newOffset,
        };
      });
    }
  };

  return (
    <section className="giphy-app__parent-section">
      <div id="giphy-app__child-section" onScroll={hanldeScroll}>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <form className="giphy-app__form" onSubmit={handleSubmit}>
            <img className="giphy-app__logo" src={LogoImage} alt="Giphy logo" />
            <input
              className="giphy-images__search-bar"
              type="text"
              required
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Search all the GIFs"
            />
            <button
              className="giphy-page__search-button"
              type="submit"
              aria-label="Submit"
            >
              <i id="giphy-page__search-icon" className="fa fa-search"></i>
            </button>
          </form>
        </div>
        {pagination && (
          <div className="Giphy-app__data-totalCount">
            Images Total Count: {pagination?.offset + 20} /
            {pagination.total_count}
          </div>
        )}
        <br />
        <GiphyDisplayPanel giphyList={giphyList} />
      </div>
    </section>
  );
};
export default GiphyDemo;
