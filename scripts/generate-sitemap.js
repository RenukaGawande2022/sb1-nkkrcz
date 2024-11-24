import generateSitemap from '../src/utils/sitemap';

async function main() {
  try {
    const sitemaps = await generateSitemap();
    console.log(`Generated ${sitemaps.length} sitemap file(s)`);
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();