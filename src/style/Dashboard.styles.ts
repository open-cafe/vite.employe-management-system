const DashboardStyles = {
  fontStyles: {
    color: 'white',
    fontWeight: 'bold',
  },
  dashboardCardTextStyle: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold   ',
  },
  tableContainer: {
    minHeight: '40vh',
    backgroundColor: 'white',
  },
  cardColor(Color: string) {
    return {
      card: {
        display: 'flex',
        height: '135px',
        backgroundColor: Color,
        cursor: 'pointer',
      },
    };
  },
};

export default DashboardStyles;
