import Script from 'next/script';

export const PersonSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zaid Ahmad",
    "alternateName": "Captain SZA",
    "url": "https://zaidahmadgg.com",
    "image": "https://empiresphere.vercel.app/api/files/67c61f38e8351fb862fa9857/view?apiKey=emp_cbb0f91b-ae83-4fdc-a4e9-e1deb39ed9cc", // Create this image
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Flexeere IT Solutions PVT LTD"
    },
    "sameAs": [
      "https://twitter.com/captainsza", // Replace with your actual social links
      "https://www.linkedin.com/in/zaid-ahmad-186665229/",
      "https://github.com/captainsza"
    ],
    "description": "Full Stack Developer specializing in Next.js, TypeScript, and AI integrations.",
    "knowsAbout": [
      "Next.js", "TypeScript", "React", "Node.js", "Flutter", 
      "MongoDB", "Prisma", "Web Development", "AI"
    ]
  };

  return (
    <Script 
      id="person-schema" 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://zaidahmadgg.com",
    "name": "Captain SZA | Zaid Ahmad Portfolio",
    "description": "Portfolio website of Zaid Ahmad, showcasing skills, projects, and professional experience in web development.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zaidahmadgg.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface Project {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  technologies: string[];
}

export const SoftwareProjectSchema = ({ project }: { project: Project }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "codeRepository": project.repoUrl,
    "programmingLanguage": project.technologies,
    "author": {
      "@type": "Person",
      "name": "Zaid Ahmad",
      "url": "https://zaidahmadgg.com"
    }
  };

  return (
    <Script
      id={`project-schema-${project.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
