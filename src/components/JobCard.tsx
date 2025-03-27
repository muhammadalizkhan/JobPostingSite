
import React from 'react';
import { Link } from 'react-router-dom';
import { Job, getCompanyById } from '../data/mockData';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const company = getCompanyById(job.companyId);
  
  // Format the posted date to show how many days ago
  const formatPostedDate = (dateString: string) => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Determine job type color
  const getJobTypeColor = (type: string) => {
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

  return (
    <div 
      className={`glass-card rounded-xl p-5 transform transition-all duration-300 ${
        featured ? 'border-l-4 border-l-job-blue shadow-md' : ''
      } hover:scale-[1.01] hover:shadow-md`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        {/* Company Logo */}
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
          <Link to={`/companies/${company?.id}`}>
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-white/50 flex items-center justify-center border border-gray-100">
              <img 
                src={company?.logo} 
                alt={`${company?.name} logo`} 
                className="h-full w-full object-contain p-1" 
              />
            </div>
          </Link>
        </div>
        
        {/* Job Info */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                <Link to={`/jobs/${job.id}`} className="hover:text-job-blue transition-colors">
                  {job.title}
                </Link>
              </h3>
              <Link to={`/companies/${company?.id}`} className="text-sm text-muted-foreground hover:text-job-blue transition-colors">
                {company?.name}
              </Link>
            </div>
            
            {featured && (
              <div className="mt-2 sm:mt-0">
                <span className="job-chip bg-job-blue/10 text-job-blue">
                  Featured
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase size={14} className="mr-1" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatPostedDate(job.postedDate)}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`job-chip ${getJobTypeColor(job.type)}`}>
              {job.type}
            </span>
            <span className="job-chip bg-job-indigo/10 text-job-indigo">
              {job.experience}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
