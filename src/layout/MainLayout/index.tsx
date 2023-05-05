import { Box } from '@mui/material'
import React, { ReactChildren, ReactNode } from 'react';
import MainLayoutStyles from '@/style/MainLayout.styles'
interface MainLayoutProps {
    children: ReactNode;
  }

const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <Box sx={MainLayoutStyles.container}>{children}</Box>
  )
}

export default MainLayout