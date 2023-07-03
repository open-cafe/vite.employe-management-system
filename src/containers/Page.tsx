import React, { useEffect } from 'react';
import { RouteProps, Route } from 'react-router-dom';

interface PageProps {
  title?: string;
  component: React.ComponentType;
}

const Page = ({ title, component: Component }: PageProps) => {
  useEffect(() => {
    document.title = 'EMS: '.concat(title || '');
  }, [title]);

  return <Component />;
};

export default Page;
