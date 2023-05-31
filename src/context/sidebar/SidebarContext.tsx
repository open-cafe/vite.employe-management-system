import { createContext, useContext } from 'react';

const SidebarContext = createContext<
  [
    (
      | {
          showSidebar: boolean | undefined;
        }
      | undefined
    ),
    (
      | {
          setShowSidebar:
            | React.Dispatch<React.SetStateAction<boolean>>
            | undefined;
        }
      | undefined
    )
  ]
>([undefined, undefined]);

export default SidebarContext;
