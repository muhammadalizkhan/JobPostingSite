
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';

export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  salary: string;
  type: JobType;
  experience: ExperienceLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  featured: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  location: string;
  description: string;
  industry: string;
  size: string;
  founded: number;
  featured: boolean;
}

export const companies: Company[] = [
  {
    id: "c1",
    name: "Visionary Design Co",
    logo: "https://placehold.co/100x100.png?text=VDC",
    website: "https://example.com/vdc",
    location: "San Francisco, CA",
    description: "We create intuitive digital experiences that empower users and deliver business value. Our approach combines rigorous research with design thinking to craft products that delight users and exceed expectations.",
    industry: "Design",
    size: "50-100",
    founded: 2015,
    featured: true
  },
  {
    id: "c2",
    name: "Alpine Tech",
    logo: "https://placehold.co/100x100.png?text=AT",
    website: "https://example.com/alpine",
    location: "Boulder, CO",
    description: "Alpine Tech builds cloud infrastructure solutions that help companies scale efficiently. We're passionate about clean code, distributed systems, and creating robust architecture that withstands real-world demands.",
    industry: "Technology",
    size: "100-250",
    founded: 2012,
    featured: true
  },
  {
    id: "c3",
    name: "Horizon Finance",
    logo: "https://placehold.co/100x100.png?text=HF",
    website: "https://example.com/horizon",
    location: "New York, NY",
    description: "Horizon Finance is redefining financial services through innovative technology. We combine deep financial expertise with cutting-edge software to create more accessible, transparent financial products for everyone.",
    industry: "Finance",
    size: "500-1000",
    founded: 2008,
    featured: false
  },
  {
    id: "c4",
    name: "Spark Digital",
    logo: "https://placehold.co/100x100.png?text=SD",
    website: "https://example.com/spark",
    location: "Austin, TX",
    description: "Spark Digital creates elegant software solutions for complex problems. We specialize in custom application development, legacy system modernization, and digital transformation initiatives.",
    industry: "Software",
    size: "50-100",
    founded: 2016,
    featured: true
  },
  {
    id: "c5",
    name: "Nexus Health",
    logo: "https://placehold.co/100x100.png?text=NH",
    website: "https://example.com/nexus",
    location: "Boston, MA",
    description: "At Nexus Health, we're building the future of healthcare through technology. Our platform connects patients, providers, and researchers to create a more effective healthcare ecosystem focused on patient outcomes.",
    industry: "Healthcare",
    size: "250-500",
    founded: 2010,
    featured: false
  }
];

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Senior UX Designer",
    companyId: "c1",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    type: "Full-time",
    experience: "Senior",
    description: "We're looking for a Senior UX Designer to join our product team. In this role, you'll craft intuitive, beautiful digital experiences that solve complex user problems while advancing business goals. The ideal candidate has a strong portfolio demonstrating systematic design thinking and experience with user research.",
    requirements: [
      "5+ years of experience in UX design for digital products",
      "Expert in design tools like Figma and Adobe Creative Suite",
      "Experience conducting user research and usability testing",
      "Portfolio showing end-to-end design process and problem-solving",
      "Strong communication skills and experience working with cross-functional teams"
    ],
    responsibilities: [
      "Lead the UX design process from research through implementation",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product managers, engineers, and stakeholders",
      "Conduct user research and translate findings into design solutions",
      "Define design systems and establish UX standards"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible remote work policy",
      "Professional development budget",
      "Wellness stipend and gym membership"
    ],
    postedDate: "2023-06-15",
    featured: true
  },
  {
    id: "j2",
    title: "Backend Engineer",
    companyId: "c2",
    location: "Boulder, CO",
    salary: "$130K - $160K",
    type: "Full-time",
    experience: "Mid",
    description: "Alpine Tech is seeking a talented Backend Engineer to help build scalable, cloud-native applications. You'll work within a collaborative engineering team developing microservices, APIs, and data pipelines that power our core infrastructure products.",
    requirements: [
      "3+ years professional experience in backend development",
      "Proficiency in Go, Python, or Java",
      "Experience with cloud providers (AWS, GCP, or Azure)",
      "Knowledge of microservices architecture and API design",
      "Understanding of database design and optimization"
    ],
    responsibilities: [
      "Design and implement scalable backend services",
      "Build and maintain RESTful and gRPC APIs",
      "Optimize application performance and reliability",
      "Contribute to system architecture decisions",
      "Collaborate with frontend engineers on feature development"
    ],
    benefits: [
      "Competitive salary and stock options",
      "Flexible work arrangements including remote options",
      "Premium health, dental, and vision coverage",
      "401(k) matching program",
      "Annual learning and development stipend"
    ],
    postedDate: "2023-06-20",
    featured: true
  },
  {
    id: "j3",
    title: "Financial Analyst",
    companyId: "c3",
    location: "New York, NY",
    salary: "$85K - $105K",
    type: "Full-time",
    experience: "Entry",
    description: "Horizon Finance is looking for a Financial Analyst to join our growing team. This role will support our investment decisions by conducting financial modeling, market research, and data analysis to identify trends and opportunities.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "1-2 years of experience in financial analysis",
      "Strong Excel and financial modeling skills",
      "Knowledge of financial markets and investment principles",
      "Excellent analytical and problem-solving abilities"
    ],
    responsibilities: [
      "Conduct financial analysis and create detailed reports",
      "Build and maintain financial models",
      "Research market trends and competitive landscape",
      "Support investment decision-making processes",
      "Prepare materials for client and internal presentations"
    ],
    benefits: [
      "Competitive base salary with performance bonuses",
      "Comprehensive benefits package",
      "Mentorship from industry experts",
      "Professional certification support",
      "Downtown office with great amenities"
    ],
    postedDate: "2023-06-18",
    featured: false
  },
  {
    id: "j4",
    title: "Frontend Developer",
    companyId: "c4",
    location: "Remote",
    salary: "$90K - $120K",
    type: "Full-time",
    experience: "Mid",
    description: "Spark Digital is hiring a Frontend Developer to create beautiful, responsive interfaces for our clients. You'll work closely with designers and backend developers to implement user interfaces that are not only visually stunning but also performant and accessible.",
    requirements: [
      "3+ years experience with modern JavaScript frameworks (React preferred)",
      "Strong knowledge of HTML, CSS, and responsive design",
      "Experience with state management solutions",
      "Understanding of web performance optimization",
      "Familiarity with UI/UX design principles"
    ],
    responsibilities: [
      "Implement responsive, accessible user interfaces",
      "Collaborate with designers to turn mockups into working code",
      "Write clean, maintainable, and well-tested code",
      "Optimize applications for maximum performance",
      "Work with backend developers to integrate APIs"
    ],
    benefits: [
      "Competitive salary based on experience",
      "Fully remote position with flexible hours",
      "Health insurance and wellness programs",
      "Regular team retreats and events",
      "Latest equipment and software stipend"
    ],
    postedDate: "2023-06-25",
    featured: true
  },
  {
    id: "j5",
    title: "Product Manager",
    companyId: "c5",
    location: "Boston, MA",
    salary: "$110K - $140K",
    type: "Full-time",
    experience: "Senior",
    description: "Nexus Health is seeking an experienced Product Manager to lead the development of our patient engagement platform. In this role, you'll define product strategy, work with cross-functional teams, and ensure we're building features that meet user needs while advancing business objectives.",
    requirements: [
      "4+ years of product management experience, preferably in healthcare or SaaS",
      "Track record of shipping successful products or features",
      "Strong analytical skills and data-driven decision making",
      "Excellent communication and stakeholder management abilities",
      "Experience with agile development methodologies"
    ],
    responsibilities: [
      "Define product strategy and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering, design, and marketing teams",
      "Analyze market trends and competitive landscape",
      "Track and measure product performance metrics"
    ],
    benefits: [
      "Competitive compensation package",
      "Comprehensive healthcare benefits",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Generous PTO and parental leave policies"
    ],
    postedDate: "2023-06-10",
    featured: false
  },
  {
    id: "j6",
    title: "DevOps Engineer",
    companyId: "c2",
    location: "Remote",
    salary: "$125K - $155K",
    type: "Full-time",
    experience: "Senior",
    description: "Alpine Tech is looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work on automating deployment processes, improving system reliability, and scaling our infrastructure to meet growing demand.",
    requirements: [
      "5+ years of experience in DevOps or Site Reliability Engineering",
      "Strong knowledge of AWS or GCP services",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Proficiency with CI/CD pipelines and containerization",
      "Understanding of monitoring, logging, and observability principles"
    ],
    responsibilities: [
      "Design and implement scalable cloud infrastructure",
      "Automate deployment and operational processes",
      "Monitor system performance and troubleshoot issues",
      "Collaborate with development teams on infrastructure needs",
      "Implement security best practices and compliance measures"
    ],
    benefits: [
      "Competitive salary and equity compensation",
      "Flexible remote work arrangement",
      "Comprehensive health benefits",
      "Professional development budget",
      "Home office stipend"
    ],
    postedDate: "2023-06-22",
    featured: true
  },
  {
    id: "j7",
    title: "UI Designer",
    companyId: "c1",
    location: "San Francisco, CA",
    salary: "$90K - $120K",
    type: "Full-time",
    experience: "Mid",
    description: "Visionary Design Co is hiring a UI Designer to create beautiful, intuitive user interfaces for our digital products. You'll work closely with UX designers, product managers, and engineers to craft visually stunning experiences that align with brand guidelines and user needs.",
    requirements: [
      "3+ years of UI design experience for digital products",
      "Expert in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating visual design skills",
      "Knowledge of design systems and component libraries",
      "Understanding of responsive design and accessibility"
    ],
    responsibilities: [
      "Create visually appealing user interfaces for web and mobile applications",
      "Develop and maintain design systems and component libraries",
      "Collaborate with UX designers to implement cohesive user experiences",
      "Work with engineers to ensure design implementation accuracy",
      "Stay current with UI design trends and best practices"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Medical, dental, and vision insurance",
      "Flexible work arrangements",
      "Design conference and continuing education budget",
      "Creative workspace with latest design tools"
    ],
    postedDate: "2023-06-28",
    featured: false
  },
  {
    id: "j8",
    title: "Data Scientist",
    companyId: "c3",
    location: "New York, NY",
    salary: "$130K - $160K",
    type: "Full-time",
    experience: "Senior",
    description: "Horizon Finance is seeking a Data Scientist to help us extract insights from financial and market data. You'll build predictive models, develop algorithms, and work with engineering teams to implement your solutions into our products.",
    requirements: [
      "5+ years of experience in data science or related field",
      "Strong background in statistics and machine learning",
      "Proficiency in Python and data analysis libraries",
      "Experience with SQL and big data technologies",
      "Knowledge of financial markets and instruments is a plus"
    ],
    responsibilities: [
      "Develop and deploy machine learning models",
      "Analyze complex datasets to extract business insights",
      "Collaborate with product and engineering teams",
      "Build data pipelines and processing systems",
      "Present findings to technical and non-technical stakeholders"
    ],
    benefits: [
      "Industry-competitive salary and bonus structure",
      "Health, dental, and vision coverage",
      "401(k) with generous company match",
      "Continuing education and conference allowance",
      "Flexible work arrangements"
    ],
    postedDate: "2023-06-12",
    featured: true
  }
];

// Helper function to get company by ID
export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Helper function to get jobs by company ID
export const getJobsByCompanyId = (companyId: string): Job[] => {
  return jobs.filter(job => job.companyId === companyId);
};

// Helper function to get job by ID
export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

// Helper function to get all job types
export const getJobTypes = (): JobType[] => {
  return ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
};

// Helper function to get all experience levels
export const getExperienceLevels = (): ExperienceLevel[] => {
  return ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];
};

// Helper function to get all locations
export const getLocations = (): string[] => {
  const locations = jobs.map(job => job.location);
  return [...new Set(locations)];
};

// Helper function to get featured jobs
export const getFeaturedJobs = (): Job[] => {
  return jobs.filter(job => job.featured);
};

// Helper function to get featured companies
export const getFeaturedCompanies = (): Company[] => {
  return companies.filter(company => company.featured);
};
