
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import CompanyCard from '../components/CompanyCard';
import { companies, Company } from '../data/mockData';
import { Search, ArrowUp } from 'lucide-react';

const Companies = () => {
  const location = useLocation();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Get unique industries from companies data
  const industries = ['All', ...new Set(companies.map(company => company.industry))];

  // Handle initial load and search params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('q') || '';
    setSearchQuery(queryValue);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location.search]);

  // Filter companies based on search and selected industry
  useEffect(() => {
    let results = [...companies];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(company => 
        company.name.toLowerCase().includes(query) || 
        company.description.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query)
      );
    }
    
    if (selectedIndustry !== 'All') {
      results = results.filter(company => company.industry === selectedIndustry);
    }
    
    setFilteredCompanies(results);
  }, [searchQuery, selectedIndustry]);

  // Handle scroll to top button visibility
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL with search parameter
    const searchParams = new URLSearchParams();
    if (value) searchParams.set('q', value);
    
    const newUrl = `/companies${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Handle industry filter change
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // Scroll to top function
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
            <h1 className="text-3xl font-bold mb-3">Explore Companies</h1>
            <p className="text-muted-foreground">
              Discover great places to work
            </p>
          </div>
          
          <div className="mb-8 flex flex-col sm:flex-row items-stretch gap-4 animate-slide-up">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search companies by name, industry, or keyword"
                className="w-full py-2.5 pl-10 pr-3 glass rounded-lg focus:outline-none focus:ring-1 focus:ring-job-blue"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Industry filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              className="glass rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-job-blue"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'All' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="glass-card rounded-xl p-5 h-64 animate-pulse" />
              ))}
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <div 
                  key={company.id} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CompanyCard company={company} featured={company.featured} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass rounded-xl">
              <h3 className="text-lg font-medium mb-2">No companies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          )}
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

export default Companies;
