import React from 'react';
import { css, withStyles } from 'withStyles';

const SimpleModal = ({ styles, text, toggleVisible }) => {
  const handleClick = e => {
    alert('thug')
  }
  return (
    <div
      {...css(styles.modal)}
      onClick={_ => toggleVisible(false)}
    >
      <div {...css(styles.modalContent)}>
        {text}
      </div>
    </div>
  );
};

export default  withStyles(({ color, unit }) => ({
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: '300px',
    // height: '100%',
    left: '50%',
    top: '25%',
    marginLeft: '-150px',
    // backgroundColor: 'black',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: color.darkPrimary,
    fontSize: '18px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px'
  },
}))(SimpleModal)
