module.exports = {
  content : {
    overflow              : 'visible',
    top                   : '38%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    opacity               : '0',
    animation             : 'appear 0.3s ease-out',
    boxShadow             : '0 4px 8px 0 rgba(255, 255, 255, 0.7)'
  },
  overlay: {
    zIndex            : 101,
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  }
};
