export const returnTagColor = (tagName: string) => {
  switch (tagName) {
    case 'Frontend':
      return '#1dd1b3';
    case 'Fullstack':
      return '#4caf50';
    case 'Designer':
      return '#ff9800';
    case 'ProjectManager':
      return '#9c27b0';
    default:
      return '#2196f3';
  }
};
