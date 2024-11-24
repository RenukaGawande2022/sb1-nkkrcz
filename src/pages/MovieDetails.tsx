import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { getMovieDetails } from '../utils/api';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!movie) return null;

  // Get additional images from the backdrop_path and poster_path
  const movieImages = [
    `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    `${TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`,
    // Add a third image from similar movies if available
    movie.similar?.results?.[0]?.backdrop_path ? 
      `${TMDB_IMAGE_BASE_URL}/original${movie.similar.results[0].backdrop_path}` : null
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{`${movie.title} (${movie.release_date.split('-')[0]}) - Watch Online on Movierush`}</title>
        <meta name="description" content={`Watch ${movie.title} online on Movierush. ${movie.overview}`} />
        <meta property="og:title" content={`${movie.title} - Movierush`} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={`${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`} />
        <link rel="canonical" href={`https://movierush.com/movie/${id}`} />
      </Helmet>

      <div className="space-y-8">
        <div className="relative h-[60vh] rounded-xl overflow-hidden">
          <img
            src={`${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8 text-white max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg mb-4">{movie.overview}</p>
              <div className="flex items-center space-x-4">
                <span>{movie.release_date.split('-')[0]}</span>
                <span>•</span>
                <span>{movie.runtime} min</span>
                <span>•</span>
                <span>{movie.vote_average.toFixed(1)} ⭐</span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast & Crew</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Character</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movie.credits.cast.slice(0, 10).map((person: any) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Actor</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.character}</td>
                  </tr>
                ))}
                {movie.credits.crew.slice(0, 5).map((person: any) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.job}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Movie Stills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movieImages.map((imageUrl, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={`${movie.title} - Still ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{movie.title} Review</h2>
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">
              {movie.title} is a remarkable cinematic achievement that showcases the very best of {movie.genres.map((g: any) => g.name).join(', ')} filmmaking. Released in {movie.release_date.split('-')[0]}, this compelling narrative takes viewers on an unforgettable journey through {movie.overview}
            </p>
            
            <p className="mt-4">
              The film's director has masterfully crafted a visual spectacle that combines stunning cinematography with powerful performances from the ensemble cast. {movie.credits.cast[0]?.name} delivers a particularly noteworthy performance as {movie.credits.cast[0]?.character}, bringing depth and authenticity to the role. The chemistry between the cast members is palpable, creating genuine emotional resonance throughout the story.
            </p>

            <p className="mt-4">
              What sets this film apart is its attention to detail in both storytelling and technical execution. The screenplay weaves together multiple narrative threads with precision, while the production design and visual effects work seamlessly to create an immersive world. The musical score enhances the emotional impact of key scenes without overwhelming the dialogue or action.
            </p>

            <p className="mt-4">
              While the film's {movie.runtime}-minute runtime might seem lengthy, every scene serves a purpose in developing the characters and advancing the plot. The pacing is deliberate but engaging, allowing viewers to fully absorb the nuances of the story while maintaining their interest throughout.
            </p>

            <p className="mt-4">
              With an impressive rating of {movie.vote_average.toFixed(1)}/10, it's clear that both critics and audiences have recognized the film's exceptional qualities. {movie.title} stands as a testament to the power of cinema to entertain, inspire, and provoke thought, making it a must-watch for fans of the genre and casual viewers alike.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What is the age rating for {movie.title}?</h3>
              <p className="text-gray-600">The movie is rated {movie.adult ? 'R (18+)' : 'PG-13'} and is suitable for {movie.adult ? 'adult audiences only' : 'teenagers and above'}.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What languages is {movie.title} available in?</h3>
              <p className="text-gray-600">The movie is available in its original language and may include dubbed versions in Hindi, Telugu, and Tamil based on availability.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How long is {movie.title}?</h3>
              <p className="text-gray-600">The movie has a runtime of {movie.runtime} minutes.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Who are the main actors in {movie.title}?</h3>
              <p className="text-gray-600">The main cast includes {movie.credits.cast.slice(0, 3).map((actor: any) => actor.name).join(', ')}.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What genre is {movie.title}?</h3>
              <p className="text-gray-600">This movie belongs to the {movie.genres.map((g: any) => g.name).join(', ')} genre(s).</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieDetails;