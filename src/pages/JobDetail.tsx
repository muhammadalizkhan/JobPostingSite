
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getJobById, getCompanyById } from '../data/mockData';
import { Calendar, MapPin, Briefcase, ArrowLeft, ExternalLink, Building2, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Simulate API call with delay
    setTimeout(() => {
      const jobData = getJobById(id);
      
      if (jobData) {
        setJob(jobData);
        const companyData = getCompanyById(jobData.companyId);
        setCompany(companyData);
      }
      
      setIsLoading(false);
    }, 500);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const formatPostedDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${company.name}`,
        text: `Check out this job: ${job.title} at ${company.name}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Function to get job type color
  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return 'bg-job-green/10 text-job-green';
      case 'Part-time':
        return 'bg-job-blue/10 text-job-blue';
      case 'Contract':
        return 'bg-job-purple/10 text-job-purple';
      case 'Freelance':
        return 'bg-job-orange/10 text-job-orange';
      case 'Internship':
        return 'bg-job-pink/10 text-job-pink';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="content-container">
            <div className="glass-card rounded-xl p-8 animate-pulse h-96" />
          </div>
        </main>
      </div>
    );
  }

  if (!job || !company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="content-container text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-job-blue hover:text-job-blue/80 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="content-container">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to jobs
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in">
              {/* Job Header */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-white/50 border border-gray-100 flex items-center justify-center">
                        <img 
                          src={company.logo} 
                          alt={`${company.name} logo`} 
                          className="h-full w-full object-contain p-1" 
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <Link 
                        to={`/companies/${company.id}`} 
                        className="text-muted-foreground hover:text-job-blue transition-colors"
                      >
                        {company.name}
                      </Link>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleShare} 
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors sm:self-start p-2"
                    aria-label="Share job"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={16} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase size={16} className="mr-1" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-1" />
                    <span>Posted {formatPostedDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`job-chip ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <span className="job-chip bg-job-indigo/10 text-job-indigo">
                    {job.experience}
                  </span>
                </div>
              </div>
              
              {/* Job Content Tabs */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="border-b border-border">
                  <div className="flex">
                    <button 
                      className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === 'description' 
                          ? 'text-job-blue border-b-2 border-job-blue' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button 
                      className={`px-6 py-3 text-sm font-medium transition-colors ${
                        activeTab === 'company' 
                          ? 'text-job-blue border-b-2 border-job-blue' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setActiveTab('company')}
                    >
                      Company
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {activeTab === 'description' ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {job.description}
                      </p>
                      
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-muted-foreground">
                        {job.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-muted-foreground">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-muted-foreground">
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {company.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Industry</h4>
                          <p className="text-muted-foreground">{company.industry}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Company Size</h4>
                          <p className="text-muted-foreground">{company.size} employees</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Founded</h4>
                          <p className="text-muted-foreground">{company.founded}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-2">Location</h4>
                          <p className="text-muted-foreground">{company.location}</p>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/companies/${company.id}`} 
                        className="text-job-blue hover:text-job-blue/80 transition-colors font-medium flex items-center"
                      >
                        View Company Profile
                        <ArrowLeft size={16} className="ml-1 rotate-180" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 animate-slide-up">
              {/* Apply Card */}
              <div className="glass-card rounded-xl p-6 mb-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Apply for this position</h2>
                
                <a 
                  href="#" 
                  className="w-full mb-3 flex items-center justify-center px-6 py-3 bg-job-blue text-white font-medium rounded-lg hover:bg-job-blue/90 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("This would normally redirect to the application page");
                  }}
                >
                  Apply Now
                </a>
                
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 border border-input bg-white text-foreground font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Company Website
                  <ExternalLink size={16} className="ml-2" />
                </a>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Job Details</h3>
                    <Link 
                      to={`/companies/${company.id}`} 
                      className="text-xs text-job-blue hover:text-job-blue/80 transition-colors flex items-center"
                    >
                      <Building2 size={12} className="mr-1" />
                      View Company
                    </Link>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Job Type</span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{job.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posted</span>
                      <span className="font-medium">{formatPostedDate(job.postedDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-50">
        <div className="content-container">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobDetail;
