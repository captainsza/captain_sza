import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://zaidahmadgg.com/sitemap.xml',
    host: 'https://zaidahmadgg.com',
  };
}
