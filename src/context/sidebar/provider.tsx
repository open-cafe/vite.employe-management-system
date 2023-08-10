import React from 'react';
import SidebarContext from './SidebarContext';
import useStatesAndActions from './useStatesAndActions';

interface ContextProps {
  children: React.ReactNode;
}
const AppProvider = ({ children }: ContextProps) => (
  <SidebarContext.Provider value={useStatesAndActions() as any}>
    {children}
  </SidebarContext.Provider>
);
export default AppProvider;
