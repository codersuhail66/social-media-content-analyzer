import { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'home' | 'analyzer' | 'about';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  analysisResult: any | null;
  setAnalysisResult: (result: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, analysisResult, setAnalysisResult }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
