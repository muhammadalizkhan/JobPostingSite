
import React, { useState } from 'react';
import { getJobTypes, getExperienceLevels, getLocations, JobType, ExperienceLevel } from '../data/mockData';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  onFilterChange: (filters: {
    jobTypes: JobType[];
    experienceLevels: ExperienceLevel[];
    locations: string[];
  }) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<ExperienceLevel[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  const jobTypes = getJobTypes();
  const experienceLevels = getExperienceLevels();
  const locations = getLocations();

  // Toggle job type selection
  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Toggle experience level selection
  const toggleExperienceLevel = (level: ExperienceLevel) => {
    setSelectedExperienceLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  // Toggle location selection
  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange({
      jobTypes: selectedJobTypes,
      experienceLevels: selectedExperienceLevels,
      locations: selectedLocations
    });
    setIsMobileFilterOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedLocations([]);
    onFilterChange({
      jobTypes: [],
      experienceLevels: [],
      locations: []
    });
  };

  // Total active filters count
  const activeFiltersCount = 
    selectedJobTypes.length + 
    selectedExperienceLevels.length + 
    selectedLocations.length;

  return (
    <div className="mb-6">
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-white rounded-lg border border-input shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-job-blue text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium">Filters</h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-job-blue hover:text-job-blue/80 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Job Types */}
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-3">Job Type</h4>
          <div className="space-y-2">
            {jobTypes.map(type => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                  checked={selectedJobTypes.includes(type)}
                  onChange={() => toggleJobType(type)}
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-3">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevels.map(level => (
              <label key={level} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                  checked={selectedExperienceLevels.includes(level)}
                  onChange={() => toggleExperienceLevel(level)}
                />
                <span className="ml-2 text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-sm font-medium mb-3">Location</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {locations.map(location => (
              <label key={location} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                  checked={selectedLocations.includes(location)}
                  onChange={() => toggleLocation(location)}
                />
                <span className="ml-2 text-sm truncate">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button for Desktop */}
        <button
          onClick={applyFilters}
          className="w-full mt-5 py-2 px-4 bg-job-blue text-white rounded-lg hover:bg-job-blue/90 transition-colors"
        >
          Apply Filters
        </button>
      </div>

      {/* Mobile filters slideover */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-medium">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {/* Job Types */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => toggleJobType(type)}
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-5">
                <h4 className="text-sm font-medium mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                        checked={selectedExperienceLevels.includes(level)}
                        onChange={() => toggleExperienceLevel(level)}
                      />
                      <span className="ml-2 text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <h4 className="text-sm font-medium mb-3">Location</h4>
                <div className="space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-job-blue focus:ring-job-blue w-4 h-4"
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                      />
                      <span className="ml-2 text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex space-x-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-2 px-4 border border-input rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2 px-4 bg-job-blue text-white rounded-lg hover:bg-job-blue/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
