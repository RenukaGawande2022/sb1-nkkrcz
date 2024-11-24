import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { genres } from '../utils/constants';

const Genre = () => {
  const { id } = useParams<{ id: string }>();
  const genre = genres.find(g => g.id === id);

  return (
    <>
      <Helmet>
        <title>{`${genre?.name || 'Genre'} Movies - MovieHub`}</title>
        <meta name="description" content={`Watch the latest ${genre?.name} movies online. Browse through our collection of ${genre?.name.toLowerCase()} movies.`} />
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{genre?.name} Movies</h1>
        {/* Genre-specific content will be implemented later */}
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </>
  );
};

export default Genre;