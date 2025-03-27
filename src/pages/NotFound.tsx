
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="content-container">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <span className="text-3xl font-bold">404</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center justify-center px-6 py-2.5 border border-input bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </button>
              
              <Link 
                to="/" 
                className="flex items-center justify-center px-6 py-2.5 bg-job-blue text-white rounded-lg hover:bg-job-blue/90 transition-colors"
              >
                <Home size={16} className="mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
