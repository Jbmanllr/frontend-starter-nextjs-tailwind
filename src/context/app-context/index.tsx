import { createContext, useContext, useState, useEffect } from 'react';
import nookies from 'nookies'

interface AppContextProps {
    isLoggedIn?: boolean;
    setIsLoggedIn?: React.SetStateAction<boolean>
    userRole?: 'guest' | 'user' | 'editor' | 'moderator' | 'admin';
    UI?: AppContextUIProps;
    children?: React.ReactNode;
}

interface AppContextUIProps {
  theme?: 'default' | 'theme-2' | 'theme-3';
  setTheme?: React.SetStateAction<'default' | 'theme-2' | 'theme-3'>
  themeMode?:  'light' | 'dark' | 'system';
  setThemeMode?: React.SetStateAction<'light' | 'dark' | 'system'>
  colorBlindUI?: null | boolean | 'deuteranomalia' | 'protanopia' | 'tritanopia';
  setColorBlindUI?: React.SetStateAction<null | boolean | 'deuteranomalia' | 'protanopia' | 'tritanopia'>
}

const AppContext = createContext<AppContextProps | null>(null);

export default function AppWrapper({ children }) {
    
    const [isLoggedIn, setIsLoggedIn] = useState<AppContextProps['isLoggedIn']>(false)
    const [userRole, setUserRole] = useState<AppContextProps['userRole']>('guest')

  console.log(`
        APP CONTEXT:
        Is Logged In: ${isLoggedIn},
        ${ isLoggedIn ? `Logged in as: ${userRole}` : '' }
  `)

  return (
    <AppContext.Provider 
        value={{ 
            isLoggedIn,
            setIsLoggedIn,
            userRole
        }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}