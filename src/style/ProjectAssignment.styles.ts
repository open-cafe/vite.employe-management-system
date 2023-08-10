const ProjectAssignmentStyles = {
  chip(tagColor: string) {
    return {
      tag: {
        mt: 2,
        mr: 2,
        color: 'white',
        backgroundColor: tagColor,
      },
    };
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    m: 'auto',
    width: 'fit-content',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    mb: 2,
    flexWrap: 'wrap',
    width: '275px',
    height: '75px',
  },
  autoComplete: { mt: 2, width: 300, mb: 2 },
};
export default ProjectAssignmentStyles;
