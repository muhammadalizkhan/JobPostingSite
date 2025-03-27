
import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: 'white';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'white',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Apply white theme to document
  useEffect(() => {
    // Add the white class to document
    document.documentElement.classList.add('white');
    
    // Clean up when component unmounts
    return () => {
      document.documentElement.classList.remove('white');
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'white' }}>
      {children}
    </ThemeContext.Provider>
  );
};
