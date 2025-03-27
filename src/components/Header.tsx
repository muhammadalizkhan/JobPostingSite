
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Briefcase, Building2, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Jobs', path: '/jobs', icon: <Briefcase className="h-4 w-4 mr-1" /> },
    { name: 'Companies', path: '/companies', icon: <Building2 className="h-4 w-4 mr-1" /> },
    { name: 'About', path: '/about', icon: <User className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg py-3 shadow-sm border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold text-white">JobBoard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/jobs"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
            >
              <Search className="h-4 w-4 mr-1" />
              Find Jobs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center py-3 px-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              to="/jobs"
              className="flex items-center justify-center mt-3 px-4 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
            >
              <Search className="h-4 w-4 mr-1" />
              Find Jobs
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
