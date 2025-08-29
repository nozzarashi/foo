export const gameCardModalStyles = {
  overlay: {
    inset: '0',
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#00000073',
    backdropFilter: 'blur(5px)',
  },
  wrapper: {
    backgroundColor: 'primaryBgColors.main',
    padding: '26px',
    maxWidth: '550px',
    width: '100%',
    borderRadius: '14px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
};
