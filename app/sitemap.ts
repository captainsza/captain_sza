import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zaidahmadgg.com';
  
  // Core pages
  const routes = [
    '',
    '/about',
    '/projects',
    '/skills',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add project pages dynamically if you have them
  // const projects = await getProjects(); // Your function to get projects
  // const projectRoutes = projects.map(project => ({
  //   url: `${baseUrl}/projects/${project.slug}`,
  //   lastModified: new Date(project.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  // Combine all routes
  return [
    ...routes,
    // ...projectRoutes,
  ];
}
