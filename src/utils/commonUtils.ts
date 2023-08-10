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

export const returnCardColor = (projectName: string) => {
  switch (projectName) {
    case 'Active':
      return '#1dd1b3';
    case 'Completed':
      return '#4caf50';
    case 'Cancelled':
      return '#e7413c';
    case 'OnHold':
      return '#ff9800';
    default:
      return '#9c27b0';
  }
};
