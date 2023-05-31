import { useState, useEffect } from 'react';

const useStatesAndActions = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const state = {
    showSidebar,
  };

  const actions = {
    setShowSidebar,
  };
  return [state, actions];
};

export default useStatesAndActions;
