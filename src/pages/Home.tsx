import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getMovies } from '../utils/api';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => getMovies(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MovieRush - Watch Latest Movies Online</title>
        <meta name="description" content="Watch the latest Hindi, Telugu, Tamil, and Hollywood movies online. Browse through our collection of trending and popular movies." />
        <meta name="keywords" content="movies, hindi movies, telugu movies, tamil movies, hollywood movies, watch online, movie reviews" />
        <meta property="og:title" content="MovieRush - Watch Latest Movies Online" />
        <meta property="og:description" content="Watch the latest Hindi, Telugu, Tamil, and Hollywood movies online. Browse through our collection of trending and popular movies." />
        <link rel="canonical" href="https://movierush.com" />
      </Helmet>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.trending.slice(0, 10).map((movie: any) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.topRated.slice(0, 10).map((movie: any) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.popular.slice(0, 10).map((movie: any) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;