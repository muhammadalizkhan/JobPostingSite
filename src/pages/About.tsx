
import React from 'react';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, User, Briefcase, Mail, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="content-container">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">About JobBoard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connecting talented professionals with innovative companies across the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="animate-slide-up">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-full bg-job-blue/10 mr-4">
                    <Building2 className="h-6 w-6 text-job-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To create a seamless connection between talented professionals and
                      forward-thinking companies, fostering growth and innovation in every industry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-full bg-job-green/10 mr-4">
                    <User className="h-6 w-6 text-job-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be the world's most trusted platform for career development and talent
                      acquisition, empowering individuals and organizations to reach their full potential.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose JobBoard?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-scale-in">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-job-purple/10 mb-4">
                      <Briefcase className="h-6 w-6 text-job-purple" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Quality Jobs</h3>
                    <p className="text-muted-foreground">
                      Curated listings from top companies across various industries.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-job-pink/10 mb-4">
                      <MapPin className="h-6 w-6 text-job-pink" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                    <p className="text-muted-foreground">
                      Connect with opportunities and talent from around the world.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-job-orange/10 mb-4">
                      <Heart className="h-6 w-6 text-job-orange" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">User-Focused</h3>
                    <p className="text-muted-foreground">
                      Designed with both job seekers and employers in mind.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-job-blue to-job-purple p-8 rounded-xl text-white text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Ready to advance your career?</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Whether you're looking for your dream job or searching for talent,
              JobBoard is here to help you succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
              <Button variant="outline" className="bg-transparent border-white hover:bg-white/20" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We're a dedicated team of professionals committed to creating the best job board platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {['Alex Morgan', 'Jamie Chen', 'Sam Taylor', 'Robin Park'].map((name, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-square bg-muted rounded-xl mb-3"></div>
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 bg-gray-50 dark:bg-gray-900">
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

export default About;
