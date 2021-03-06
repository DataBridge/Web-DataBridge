import React from 'react';
import { css, withStyles } from 'withStyles';
import { branch } from 'recompose';

function Tertiary({ styles, disabled, text, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        {...(disabled ? css(styles.disabled) : css(styles.default))}
      >
        <div {...(disabled ? css(styles.iconHolderDisabled) :
          css(styles.iconHolderDefault)) } />
        <div {...css(styles.text)}> {text} </div>
      </button>
  )
}

const iconHolder = {
  width: '60px',
  height: '50px',
  backgroundImage: 'url("../../../imgs/icons/down-arrow-white.png")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '25px',
  display: 'table-cell',
  float: 'left',
};

const button = {
  fontFamily: 'Quicksand',
  fontWeight: 'bold',
  fontSize: '16px',
  color: 'white',
  padding: '0',
  width: '200px',
  height: '50px',
  borderRadius: '25px',
  border: 'none',
  ':focus': {
    outlineStyle: 'none'
  },
}

export default  withStyles(({ color, unit, display }) => ({
    iconHolderDefault: {
      backgroundColor: color.lightPrimary,
      ...iconHolder,
    },
    iconHolderDisabled: {
      backgroundColor: color.lightGrey,
      ...iconHolder,
    },
    text: {
      width: '140px',
      height: '100%',
      display: 'table-cell',
      float: 'left',
      textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: '50px',
    },
    default: {
      backgroundColor: color.lightPrimary,
      ':hover': {
        backgroundColor: color.darkPrimary,
        cursor: 'pointer',
      },
      ...button,
    },
    disabled: {
      backgroundColor: color.darkGrey,
      ...button,
    },
  }))(Tertiary)
