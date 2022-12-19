import GenerateSitemap from 'react-router-sitemap-maker';
import Router from './src/components/Sitemap';

const generateSitemap = async () => {
  const sitemap = await GenerateSitemap(Router(), {
    baseUrl: 'https://wydimperial.com',
    hashrouting: false,
    changeFrequency: 'daily',
  });

  sitemap.toFile('public/sitemap.xml');
  sitemap.toFile('dist/sitemap.xml');
}

generateSitemap();