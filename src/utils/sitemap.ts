import { getMovies } from './api';
import { languages, genres } from './constants';

async function generateSitemap(pageNum = 1) {
  const urls: string[] = [
    '/',
    '/search',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
    '/dmca',
  ];

  // Add language pages
  languages.forEach(lang => {
    urls.push(`/language/${lang.id}`);
  });

  // Add genre pages
  genres.forEach(genre => {
    urls.push(`/genre/${genre.id}`);
  });

  // Add movie pages
  for (const lang of languages) {
    const movies = await getMovies(lang.id);
    movies.popular.forEach((movie: any) => {
      urls.push(`/movie/${movie.id}`);
    });
    movies.topRated.forEach((movie: any) => {
      urls.push(`/movie/${movie.id}`);
    });
    movies.trending.forEach((movie: any) => {
      urls.push(`/movie/${movie.id}`);
    });
  }

  // Split URLs into chunks of 5000
  const urlChunks = [];
  for (let i = 0; i < urls.length; i += 5000) {
    urlChunks.push(urls.slice(i, i + 5000));
  }

  // Generate sitemap XML for each chunk
  const sitemaps = urlChunks.map((chunk, index) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${chunk.map(url => `
  <url>
    <loc>https://movierush.com${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    return {
      filename: `sitemap-${index + 1}.xml`,
      content: xml
    };
  });

  // Generate sitemap index if there are multiple sitemaps
  if (sitemaps.length > 1) {
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map((sitemap, index) => `
  <sitemap>
    <loc>https://movierush.com/${sitemap.filename}</loc>
  </sitemap>`).join('')}
</sitemapindex>`;

    sitemaps.push({
      filename: 'sitemap.xml',
      content: sitemapIndex
    });
  }

  return sitemaps;
}

export default generateSitemap;