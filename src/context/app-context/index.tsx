import { createContext, useContext, useState } from 'react';
import nookies from 'nookies'

const userRoles = ['visitor', 'user', 'editor', 'moderator', 'admin']
interface AppContextProps {
    children?: React.ReactNode;
    environment?: 'development' | 'production' | 'test';
    isLoggedIn?: boolean;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    userRole?: undefined | 'visitor' | 'user' | 'editor' | 'moderator' | 'admin';
    setUserRole? : React.Dispatch<React.SetStateAction<undefined | 'visitor' | 'user' | 'editor' | 'moderator' | 'admin'>>;
}

interface AppWrapperProps { children?: React.ReactNode }

const AppContext = createContext<AppContextProps | null>(null);

const environment = process.env.NODE_ENV;

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState<AppContextProps['isLoggedIn']>(false)
    const [userRole, setUserRole] = useState<AppContextProps['userRole']>('visitor')

    { environment === 'development' && console.log(`
        APP CONTEXT
          Environment: ${environment}
          Logged In: ${isLoggedIn}
          User Role: ${isLoggedIn ? userRole : 'visitor'}
          ${process.env.NEXT_PUBLIC_ENV_VARIABLE}
          ${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}
          ${process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}
          ${process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE}
    `)}

  return (
    <AppContext.Provider 
        value={{
            environment,
            isLoggedIn,
            setIsLoggedIn,
            userRole,
            setUserRole
        }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppWrapper