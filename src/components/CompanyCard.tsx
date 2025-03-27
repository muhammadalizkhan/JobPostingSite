
import React from 'react';
import { Link } from 'react-router-dom';
import { Company, getJobsByCompanyId } from '../data/mockData';
import { MapPin, Briefcase } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  featured?: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, featured = false }) => {
  const jobs = getJobsByCompanyId(company.id);
  
  return (
    <div 
      className={`glass-card rounded-xl p-5 h-full flex flex-col ${
        featured ? 'border-t-4 border-t-job-blue shadow-md' : ''
      }`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-white/50 flex items-center justify-center border border-gray-100">
            <img 
              src={company.logo} 
              alt={`${company.name} logo`} 
              className="h-full w-full object-contain p-1" 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">
            <Link to={`/companies/${company.id}`} className="hover:text-job-blue transition-colors">
              {company.name}
            </Link>
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" />
            <span>{company.location}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
        {company.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
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
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center text-sm">
          <Briefcase size={14} className="mr-1" />
          <span>{jobs.length} open positions</span>
        </div>
        <Link 
          to={`/companies/${company.id}`}
          className="text-sm font-medium text-job-blue hover:text-job-blue/80 transition-colors"
        >
          View Company
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
