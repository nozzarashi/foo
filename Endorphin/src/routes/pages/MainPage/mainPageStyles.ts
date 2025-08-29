export const mainPageStyles = {
  hero: {
    display: 'flex',
    alignSelf: 'start',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #7c3bedff 0px, #e92f8cff 100%)',
    padding: '24px 0',
    borderRadius: '20px',
    mb: '32px',
  },
  countersList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    textAlign: 'center',
    gap: '12px',
    mb: '32px',
  },
  countersItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
    border: '1px solid #71717a67',
    borderRadius: '10px',
    textAlign: 'center',
  },

  viewMoreButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '36px',
  },
};
