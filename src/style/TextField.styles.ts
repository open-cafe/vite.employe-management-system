const TextFieldStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  size: {
    width: { sm: 200, md: 300, lg: 400 },
    '& .MuiInputBase-root': {
      height: 60,
    },
  },
};

export default TextFieldStyles;
