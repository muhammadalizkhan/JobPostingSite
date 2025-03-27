
import React, { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  className?: string;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className = '', 
  compact = false 
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), location.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative glass rounded-xl ${
        compact ? 'p-2' : 'p-3 sm:p-4'
      } ${className}`}
    >
      <div className={`flex flex-col sm:flex-row gap-3 ${compact ? 'items-center' : ''}`}>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full py-2.5 pl-10 pr-3 bg-white/50 rounded-lg border border-input focus:outline-none focus:ring-1 focus:ring-job-blue"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        {!compact && (
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Location (city or remote)"
              className="w-full py-2.5 pl-10 pr-3 bg-white/50 rounded-lg border border-input focus:outline-none focus:ring-1 focus:ring-job-blue"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        )}
        
        <button
          type="submit"
          className={`flex items-center justify-center bg-job-blue hover:bg-job-blue/90 text-white font-medium rounded-lg transition-colors ${
            compact 
              ? 'px-4 py-2.5 min-w-[80px]' 
              : 'px-5 py-2.5 sm:min-w-[120px]'
          }`}
        >
          {compact ? (
            <Search className="w-5 h-5" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
