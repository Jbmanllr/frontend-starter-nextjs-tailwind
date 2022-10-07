import { createContext, useContext, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import {useTheme} from 'next-themes'


interface AppContextProps {
    htmlClassName?: string;
    bodyClassName?: string;
    isLoggedIn?: boolean;
    userRole?: string;
    theme?:  'default' | 'theme-1' | 'theme-2';
    themeMode?: any;
    children?: React.ReactNode;
}

const themeModes = [
    { id: 1, name: 'Light', slug: 'light', icon: <SunIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/> },
    { id: 2, name: 'Dark', slug: 'dark', icon: <MoonIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/> },
    { id: 3, name: 'System', slug: 'system', icon: <ComputerDesktopIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/>}
  ]


const AppContext = createContext<AppContextProps | null>(null);

export default function AppWrapper({ children }) {
    const { theme, setTheme } = useTheme()
    
    //const [theme, setTheme] = useState<AppContextProps['theme']>('default')
    const [themeMode, setThemeMode] = useState<AppContextProps['themeMode']>(themeModes[0])
    const [isLoggedIn, setIsLoggedIn] = useState<AppContextProps['isLoggedIn']>(false)

  console.log(`
        Theme: ${theme},
        Theme Mode: ${themeMode},
        Is Logged In: ${isLoggedIn}
   `)

  return (
    <AppContext.Provider 
        value={{ 
            isLoggedIn,
            setIsLoggedIn, 
            theme, 
            setTheme,
            themeModes,
            themeMode,
            setThemeMode 
        }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}