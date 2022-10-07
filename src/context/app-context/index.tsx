import { createContext, useContext } from 'react';

interface AppContextProps {
    htmlClassName?: string;
    bodyClassName?: string;
    isLoggedIn?: boolean;
    userRole?: string;
    theme?: string;
    themeMode?: string;
    children?: React.ReactNode;
}

const AppContext = createContext<AppContextProps | null>(null);

export function AppWrapper({ children }) {
    
  let sharedState = {/* whatever you want */}

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}