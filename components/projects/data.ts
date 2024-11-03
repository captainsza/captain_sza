export const projects: Project[] = [
      
        {
          id: '2',
          title: 'ADVPS (Admin and Customer Side)',
          description: 'An e-commerce platform for virtual private server sales with comprehensive admin and customer panels.',
          image: '/projects/2.png',
          previewVideo: '/videos/advps.mp4',
          technologies: ['Next.js', 'Prisma', 'MongoDB', 'Stripe'],
          progress: 95,
          type: 'fullstack',
          category: ['web'],
          githubUrl: '#',
          liveUrl: 'https://old.advps.com',
          highlights: [
            'Automated VPS provisioning and management',
            'Client-side order and billing management',
            'Admin dashboard with order tracking and analytics',
            'Renewal and upgrade options for existing services'
          ],
          stats: {
            commits: 650,
            stars: 320,
            issues: 18
          },
          completionDate: '2024-04-10'
        },
        {
          id: '3',
          title: 'AiroMap',
          description: 'An air quality monitoring application providing real-time air pollution data using IQAir API and location services.',
          image: '/projects/6.png',
          previewVideo: '/videos/airomap.mp4',
          technologies: ['React Native', 'Express', 'MongoDB', 'Google SDKs'],
          progress: 100,
          type: 'mobile',
          category: ['mobile'],
          githubUrl: '#',
          liveUrl: '#',
          highlights: [
            'Real-time air quality data integration',
            'Location-based AQI display with GPS support',
            'Visual map overlay for pollution hotspots',
            'Push notifications for high pollution levels'
          ],
          stats: {
            commits: 300,
            stars: 150,
            issues: 8
          },
          completionDate: '2023-08-10'
        },
        {
          id: '4',
          title: 'FlexeereLedger',
          description: 'Comprehensive invoice management and expense tracking system for businesses with multi-company support.',
          image: '/projects/3.png',
          previewVideo: '/videos/flexeere_ledger.mp4',
          technologies: ['Next.js', 'Prisma', 'MongoDB', 'Node.js'],
          progress: 90,
          type: 'fullstack',
          category: ['web'],
          githubUrl: '#',
          liveUrl: 'https://flexeereledger.vercel.app/',
          highlights: [
            'Multi-company invoice and product management',
            'Universal user verification with KYC integration',
            'Comprehensive expense tracking with detailed reports',
            'Integrated admin dashboard with data analytics'
          ],
          stats: {
            commits: 620,
            stars: 300,
            issues: 12
          },
          completionDate: '2024-01-30'
        },
        {
          id: '5',
          title: 'School Management System',
          description: 'A digital platform for managing school administration, student records, and academic activities.',
          image: '/projects/4.png',
          previewVideo: '/videos/school_management.mp4',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          progress: 92,
          type: 'fullstack',
          category: ['mobile','web'],
          githubUrl: '#',
          liveUrl: '#',
          highlights: [
            'Student enrollment and academic records management',
            'Teacher and staff management with role-based access',
            'Class schedules, grades, and attendance tracking',
            'Parent portal for real-time updates on student progress'
          ],
          stats: {
            commits: 550,
            stars: 230,
            issues: 15
          },
          completionDate: '2024-03-05'
        },
        {
          id: '6',
          title: 'Telecaller Management System',
          description: 'A CRM system for telecallers to manage customer calls, track engagement, and record call outcomes.',
          image: '/projects/5.png',
          previewVideo: '/videos/telecaller_management.mp4',
          technologies: ['Next.js', 'Prisma', 'MongoDB', 'Node.js'],
          progress: 90,
          type: 'fullstack',
          category: ['web'],
          githubUrl: 'https://github.com/zaidahmad/TelecallerManagement',
          liveUrl: 'https://telecallermanagement.example.com',
          highlights: [
            'Admin dashboard for telecaller performance tracking',
            'Automated call logging and interaction recording',
            'Customer categorization based on call outcomes',
            'Reports on telecaller engagement and call statistics'
          ],
          stats: {
            commits: 500,
            stars: 220,
            issues: 10
          },
          completionDate: '2023-12-20'
        },
        {
          id: '7',
          title: 'BeingTrendz',
          description: 'AI-powered social media content generation platform with image analysis and trendy caption generation.',
          image: '/projects/1.png',
          previewVideo: '/videos/being_trendz.mp4',
          technologies: ['Next.js', 'Gemini AI', 'MongoDB', 'Cloudinary'],
          progress: 95,
          type: 'fullstack',
          category: ['web','ai'],
          githubUrl: '#',
          liveUrl: 'https://beingtrendz.com',
          highlights: [
            'AI-driven trendy caption generation from images',
            'AI-based voice assistant integration',
            'Social media sharing with real-time updates',
            'Responsive design for all devices'
          ],
          stats: {
            commits: 550,
            stars: 210,
            issues: 20
          },
          completionDate: '2024-02-15'
        }
    ];
    
// Types
export interface Project {
        id: string;
        title: string;
        description: string;
        image: string;
        previewVideo: string;
        technologies: string[];
        progress: number;
        githubUrl?: string;
        liveUrl?: string;
        type: 'frontend' | 'backend' | 'fullstack' | 'mobile';
        highlights: string[];
        stats: {
          commits: number;
          stars: number;
          issues: number;
        };
        category: ('web' | 'mobile' | 'ai' | 'blockchain')[];
        completionDate: string;
      }
      