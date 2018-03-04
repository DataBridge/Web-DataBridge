import React from 'react';
import { css, withStyles } from 'withStyles';

function InfoTitle({ styles, text}) {
  return (
    <div {...css(styles.container)}>
      <hr {...css(styles.hr)}/>
      <span {...css(styles.text)}>
        {text}
      </span>
    </div>
  )
} 

export default  withStyles(({ color, unit }) => ({
  container: {
    marginTop: '40px',
  },
  hr: {
    marginBottom: '-12px',
    width: '80%',
  },
  text: {
    backgroundColor: 'white',
    color: 'black',
  }
}))(InfoTitle)