import React from 'react';
import { css, withStyles } from 'withStyles';

function Toggle({ styles, on, onClick }) {
  if (on)
    return (
      <span {...css(styles.container)} onClick={onClick}>
          <img src="../../imgs/icons/on.png" alt="on" {...css(styles.img) } />
      </span>
    )
    else
    return (
      <span {...css(styles.container)} onClick={onClick}>
          <img src="../../imgs/icons/off.png" alt="off" {...css(styles.img) } />
      </span>
    )
} 

export default  withStyles(({ color, unit }) => ({
  container: {
  },
  img: {
  },
}))(Toggle)
