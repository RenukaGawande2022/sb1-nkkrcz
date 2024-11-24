import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from './constants';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getMovies = async (language = 'hi', page = 1) => {
  const params = {
    page,
    with_original_language: language === 'en' ? 'en' : undefined,
    region: language === 'en' ? 'US' : 'IN',
    with_text_query: language === 'hi' ? 'hindi dubbed' : undefined,
  };

  const [trendingRes, topRatedRes, popularRes] = await Promise.all([
    api.get('/trending/movie/week', { params }),
    api.get('/movie/top_rated', { params }),
    api.get('/movie/popular', { params })
  ]);

  return {
    trending: trendingRes.data.results,
    topRated: topRatedRes.data.results,
    popular: popularRes.data.results,
  };
};

export const getMovieDetails = async (id: string) => {
  const [details, credits, videos] = await Promise.all([
    api.get(`/movie/${id}`),
    api.get(`/movie/${id}/credits`),
    api.get(`/movie/${id}/videos`)
  ]);

  return {
    ...details.data,
    credits: credits.data,
    videos: videos.data,
  };
};

export const searchMovies = async (query: string, language = 'hi', page = 1) => {
  const params = {
    query,
    page,
    with_original_language: language === 'en' ? 'en' : undefined,
    region: language === 'en' ? 'US' : 'IN',
    with_text_query: language === 'hi' ? 'hindi dubbed' : undefined,
  };

  const { data } = await api.get('/search/movie', { params });
  return data;
};