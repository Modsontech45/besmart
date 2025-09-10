import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorScheme = 'blue' | 'teal' | 'purple';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    const savedScheme = localStorage.getItem('colorScheme') as ColorScheme;
    return savedScheme || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme to document root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    
    // Apply color scheme to document root
    document.documentElement.classList.remove('theme-blue', 'theme-teal', 'theme-purple');
    document.documentElement.classList.add(`theme-${colorScheme}`);
  }, [colorScheme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  const value = {
    theme,
    colorScheme,
    toggleTheme,
    setTheme,
    setColorScheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};