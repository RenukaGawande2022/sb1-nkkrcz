import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getMovies } from '../utils/api';
import { TMDB_IMAGE_BASE_URL, languages } from '../utils/constants';

const Language = () => {
  const { id } = useParams<{ id: string }>();
  const language = languages.find(l => l.id === id);

  const { data, isLoading } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovies(id),
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
        <title>{`${language?.name || 'Movies'} - MovieHub`}</title>
        <meta name="description" content={`Watch the latest ${language?.name} movies online. Browse through our collection of ${language?.name.toLowerCase()} movies.`} />
      </Helmet>

      <div className="space-y-12">
        <h1 className="text-3xl font-bold text-gray-900">{language?.name} Movies</h1>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data?.popular.map((movie: any) => (
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
            {data?.topRated.map((movie: any) => (
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

export default Language;