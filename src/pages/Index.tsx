
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Building2, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import CompanyCard from '../components/CompanyCard';
import { getFeaturedJobs, getFeaturedCompanies } from '../data/mockData';

const Index = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading with a slight delay for animation purposes
    const timer = setTimeout(() => {
      setFeaturedJobs(getFeaturedJobs());
      setFeaturedCompanies(getFeaturedCompanies());
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string, location: string) => {
    // Navigate to jobs page with search params
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    
    window.location.href = `/jobs?${searchParams.toString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-transparent z-[-1]" />
        
        <div className="content-container text-center">
          <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
              Find Your <span className="text-job-blue">Perfect Job</span> <br className="hidden md:block" />
              Match Today
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover thousands of job opportunities with all the information you need. 
              Find your dream job in one place.
            </p>

            <div className="max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="glass px-4 py-2 rounded-full flex items-center text-sm">
                <Briefcase className="w-4 h-4 mr-2 text-job-blue" />
                <span>Thousands of jobs</span>
              </div>
              <div className="glass px-4 py-2 rounded-full flex items-center text-sm">
                <Building2 className="w-4 h-4 mr-2 text-job-purple" />
                <span>Top companies</span>
              </div>
              <div className="glass px-4 py-2 rounded-full flex items-center text-sm">
                <Search className="w-4 h-4 mr-2 text-job-green" />
                <span>Easy to search</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="content-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Link 
              to="/jobs" 
              className="flex items-center text-sm font-medium text-job-blue hover:text-job-blue/80 transition-colors"
            >
              View all jobs
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {isLoaded ? (
              featuredJobs.slice(0, 4).map((job) => (
                <div key={job.id} className="animate-scale-in">
                  <JobCard job={job} featured={true} />
                </div>
              ))
            ) : (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="glass-card rounded-xl p-5 h-44 animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16">
        <div className="content-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Companies</h2>
            <Link 
              to="/companies" 
              className="flex items-center text-sm font-medium text-job-blue hover:text-job-blue/80 transition-colors"
            >
              View all companies
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoaded ? (
              featuredCompanies.map((company) => (
                <div key={company.id} className="animate-scale-in">
                  <CompanyCard company={company} featured={true} />
                </div>
              ))
            ) : (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="glass-card rounded-xl p-5 h-64 animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-job-blue/90 to-job-indigo/90 text-white">
        <div className="content-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next opportunity?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Join thousands of job seekers who have found their dream job through our platform.
          </p>
          <Link 
            to="/jobs" 
            className="inline-flex items-center px-6 py-3 bg-white text-job-blue font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search size={18} className="mr-2" />
            Browse All Jobs
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-50">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-semibold bg-gradient-to-r from-job-blue to-job-indigo bg-clip-text text-transparent">
                JobBoard
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Find your dream job today
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </Link>
              <Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Companies
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
