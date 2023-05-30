import React from 'react';
import SidebarContext from './SidebarContext';
import useStatesAndActions from './useStatesAndActions';

interface ContextProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: ContextProps) => (
  //@ts-ignore
  <SidebarContext.Provider value={useStatesAndActions()}>
    {children}
  </SidebarContext.Provider>
);
export default AppProvider;
