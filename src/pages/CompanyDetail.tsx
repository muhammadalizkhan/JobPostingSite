
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { getCompanyById, getJobsByCompanyId } from '../data/mockData';
import { Calendar, MapPin, ExternalLink, ArrowLeft, Globe, Building2, Users, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with delay
    setTimeout(() => {
      const companyData = getCompanyById(id);
      
      if (companyData) {
        setCompany(companyData);
        const companyJobs = getJobsByCompanyId(id);
        setJobs(companyJobs);
      }
      
      setIsLoading(false);
    }, 500);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: company.name,
        text: `Check out ${company.name} on JobBoard`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
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

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="content-container text-center">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The company you're looking for doesn't exist or has been removed.
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
              Back to companies
            </button>
          </div>
          
          {/* Company Header */}
          <div className="glass-card rounded-xl p-6 mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-100">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="h-full w-full object-contain p-2" 
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{company.name}</h1>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin size={16} className="mr-1" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 sm:mt-0 space-x-3">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 rounded-lg border border-input hover:bg-gray-50 transition-colors"
                    >
                      <Globe size={16} className="mr-2" />
                      Website
                    </a>
                    <button 
                      onClick={handleShare} 
                      className="flex items-center px-4 py-2 rounded-lg border border-input hover:bg-gray-50 transition-colors"
                      aria-label="Share company"
                    >
                      <Share2 size={16} className="mr-2" />
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="job-chip bg-gray-100 text-gray-800">
                    {company.industry}
                  </span>
                  <span className="job-chip bg-gray-100 text-gray-800">
                    {company.size} employees
                  </span>
                  <span className="job-chip bg-gray-100 text-gray-800">
                    Founded {company.founded}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Description */}
            <div className="lg:col-span-2 animate-slide-up">
              <div className="glass-card rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description}
                </p>
              </div>
              
              {/* Company Jobs */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {jobs.length} Open Positions at {company.name}
                </h2>
                
                {jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No open positions at the moment
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Company Info Sidebar */}
            <div className="lg:col-span-1 animate-slide-up">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Company Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center text-sm font-medium mb-2">
                      <Building2 size={16} className="mr-2 text-job-blue" />
                      Industry
                    </div>
                    <p className="text-muted-foreground">{company.industry}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-sm font-medium mb-2">
                      <Users size={16} className="mr-2 text-job-blue" />
                      Company Size
                    </div>
                    <p className="text-muted-foreground">{company.size} employees</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-sm font-medium mb-2">
                      <Calendar size={16} className="mr-2 text-job-blue" />
                      Founded
                    </div>
                    <p className="text-muted-foreground">{company.founded}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-sm font-medium mb-2">
                      <MapPin size={16} className="mr-2 text-job-blue" />
                      Location
                    </div>
                    <p className="text-muted-foreground">{company.location}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-sm font-medium mb-2">
                      <Globe size={16} className="mr-2 text-job-blue" />
                      Website
                    </div>
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-job-blue hover:text-job-blue/80 transition-colors flex items-center"
                    >
                      {company.website.replace(/^https?:\/\//, '')}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
                
                {jobs.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-sm font-medium mb-4">Open Positions</h3>
                    <div className="space-y-3">
                      {jobs.slice(0, 3).map((job) => (
                        <Link 
                          key={job.id}
                          to={`/jobs/${job.id}`}
                          className="block p-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{job.location}</div>
                        </Link>
                      ))}
                      
                      {jobs.length > 3 && (
                        <Link 
                          to="#company-jobs" 
                          className="text-sm text-job-blue hover:text-job-blue/80 transition-colors flex items-center"
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#company-jobs')?.scrollIntoView({
                              behavior: 'smooth'
                            });
                          }}
                        >
                          View all {jobs.length} positions
                          <ArrowLeft size={14} className="ml-1 rotate-180" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
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

export default CompanyDetail;
