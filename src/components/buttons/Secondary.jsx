import React from 'react';
import { css, withStyles } from 'withStyles';
import { branch } from 'recompose';

function Secondary({ styles, disabled, text, onClick }) {
  return (
    <div {...(disabled ? css(styles.containerDisabled) : css(styles.container))}>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        {...(disabled ? css(styles.disabled) : css(styles.default))}
      >
        {text}
      </button>
    </div>
  )
}

const button = {
  fontFamily: 'Quicksand',
  fontWeight: 'bold',
  fontSize: '14px',
  padding: '0',
  width: '100%',
  height: '100%',
  borderRadius: '25px',
  ':focus': {
    outlineStyle: 'none'
    },
}

const container = {
  margin: 'auto',
  width: '150px',
  height: '40px',
  borderRadius: '25px',
  padding: '1px',
}

export default  withStyles(({ color, unit }) => ({
    container: {
      backgroundImage: color.gradientRight,
      ...container
    },
    containerDisabled: {
      backgroundImage: color.gradientGreyRight,
      ...container
    },
    default: {
      border: 'transparent',
      backgroundColor: 'white',
      color: color.lightPrimary,
      ':hover': {
        color: 'white',
        backgroundImage: color.gradientRight,
        cursor: 'pointer',
      },
      ...button,
    },
    disabled: {
      border: 'transparent',
      backgroundColor: 'white',
      ...button,
    },
  }))(Secondary)
