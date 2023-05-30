import { createContext, useContext } from 'react';

const SidebarContext = createContext<
  [
    {
      showSidebar?: boolean;
    },
    (
      | {
          setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
        }
      | undefined
    )
  ]
>([{}, undefined]);

export default SidebarContext;
