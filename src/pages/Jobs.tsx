
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import JobCard from '../components/JobCard';
import { jobs, Job, JobType, ExperienceLevel, companies } from '../data/mockData';
import { ArrowUp } from 'lucide-react';

const Jobs = () => {
  const location = useLocation();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Parse initial query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('q') || '';
    const locationValue = queryParams.get('location') || '';
    
    setSearchQuery(queryValue);
    setSearchLocation(locationValue);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location.search]);

  // Filter jobs based on search criteria and filters
  useEffect(() => {
    let results = [...jobs];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.description.toLowerCase().includes(query) ||
        getCompanyName(job.companyId).toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (searchLocation) {
      const locationQuery = searchLocation.toLowerCase();
      results = results.filter(job => 
        job.location.toLowerCase().includes(locationQuery)
      );
    }
    
    setFilteredJobs(results);
  }, [searchQuery, searchLocation]);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to get company name
  const getCompanyName = (companyId: string): string => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : '';
  };

  // Handle search form submission
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    
    // Update URL with search parameters without refreshing the page
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    
    const newUrl = `/jobs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Handle filter changes
  const handleFilterChange = (filters: {
    jobTypes: JobType[];
    experienceLevels: ExperienceLevel[];
    locations: string[];
  }) => {
    let results = [...jobs];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.description.toLowerCase().includes(query) ||
        getCompanyName(job.companyId).toLowerCase().includes(query)
      );
    }
    
    // Apply location query filter
    if (searchLocation) {
      const locationQuery = searchLocation.toLowerCase();
      results = results.filter(job => 
        job.location.toLowerCase().includes(locationQuery)
      );
    }
    
    // Apply job type filter
    if (filters.jobTypes.length > 0) {
      results = results.filter(job => filters.jobTypes.includes(job.type));
    }
    
    // Apply experience level filter
    if (filters.experienceLevels.length > 0) {
      results = results.filter(job => filters.experienceLevels.includes(job.experience));
    }
    
    // Apply location filter
    if (filters.locations.length > 0) {
      results = results.filter(job => filters.locations.includes(job.location));
    }
    
    setFilteredJobs(results);
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="content-container">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">Find Your Perfect Job</h1>
            <p className="text-muted-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
            </p>
          </div>
          
          <div className="mb-8 animate-slide-up">
            <SearchBar 
              onSearch={handleSearch} 
              className="max-w-none"
              compact={false}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterSection onFilterChange={handleFilterChange} />
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              {isLoading ? (
                // Loading skeleton
                <div className="space-y-4">
                  {Array(5).fill(0).map((_, index) => (
                    <div key={index} className="glass-card rounded-xl p-5 h-36 animate-pulse" />
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job, index) => (
                    <div 
                      key={job.id} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <JobCard job={job} featured={job.featured} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass rounded-xl">
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
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
      
      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-job-blue text-white rounded-full shadow-lg hover:bg-job-blue/90 transition-all animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Jobs;
