import axios from 'axios';
import env from '../env';

const baseUrl = env?.apis?.giphy?.baseUrl
  ? env.apis.giphy.baseUrl
  : 'https://api.giphy.com';

const apiKey = env?.apis?.giphy?.apiKey ? env.apis.giphy.apiKey : 'XXXXXXXX';

const searchGifsPath = 'v1/gifs/search';
const fetchGifsTrendPath = 'v1/gifs/trending';

export const searchGifs = (giphySearch, offset = 0, limit = 20) => {
  const searchGifsEndPoints = [baseUrl, searchGifsPath].join('/');
  return axios(searchGifsEndPoints, {
    params: {
      api_key: apiKey,
      q: giphySearch,
      offset,
      limit,
    },
  });
};

export const fetchGifsTrend = (offset = 0, limit = 20) => {
  const fetchGifsTrendEndpoint = [baseUrl, fetchGifsTrendPath].join('/');
  return axios(fetchGifsTrendEndpoint, {
    params: {
      api_key: apiKey,
      offset,
      limit,
    },
  });
};
