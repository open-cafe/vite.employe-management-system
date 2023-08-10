const SideBarStyles = {
  sidebarlist: {
    backgroundColor: '#ED81AD',
    height: '100vh',
  },

  sidebarGrid: {
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },

  listButtonStyle: {
    display: 'flex',
    height: 50,
    backgroundColor: 'transparent',

    '&:hover': { color: 'black' },
  },

  listTextStyle: {
    width: 200,
    color: 'white',
  },
};
export default SideBarStyles;
