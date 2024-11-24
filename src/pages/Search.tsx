import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon } from 'lucide-react';
import { searchMovies } from '../utils/api';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

const Search = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
  });

  return (
    <>
      <Helmet>
        <title>Search Movies - MovieHub</title>
        <meta name="description" content="Search for your favorite movies across Hindi, Telugu, Tamil, and Hollywood cinema." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : data?.results?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data.results.map((movie: any) => (
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
        ) : query && (
          <p className="text-center text-gray-600">No movies found for "{query}"</p>
        )}
      </div>
    </>
  );
};

export default Search;