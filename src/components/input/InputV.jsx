import React from 'react';
import { withApollo } from 'react-apollo';
import { css, withStyles } from 'withStyles';

const InputV = ({ styles, placeholder, state, empty, valid,
  invalid, validate, errorMessage, setValue, display, pwd }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (!value)
      empty();
    else
      if (validate(value)) {
        valid();
        setValue(e.target.value);
      }
      else {
        invalid();
        setValue(null);
      }
  }

  let styleSuffix;
  if (state === 'invalid' || state === 'error')
    styleSuffix = 'Inv';
  else if (state === 'valid')
    styleSuffix = 'Val';
  else
    styleSuffix = '';

  let title;
  let legend;
  if (!(state === 'empty')) {
   title = (
      <span {...css(styles['title'+styleSuffix])}>
        {placeholder.toUpperCase()}
      </span>
   )
  }
  else {
    title = null;
  }

  if ((state === 'invalid')) {
    legend = (
    <legend {...css(styles['legend'+styleSuffix])}>
      {`Invalid ${placeholder.toLowerCase()}`}
    </legend>
  );
  } else if (state === 'error') {
    legend = (
      <legend {...css(styles['legend'+styleSuffix])}>
        {`${errorMessage.toLowerCase()}`}
      </legend>
    );
  } else {
    legend = null;
  }

  return (
    <fieldset {...css(styles['fieldset'+styleSuffix], {display})}>
      {legend}
      {title}
      <input
        {...css(styles['input'+styleSuffix])}
        type={pwd ? 'password' : 'text'}
        placeholder={placeholder}
        onChange={handleChange}
      />
   </fieldset>
  )
};

const fieldset =  {
  color: 'black',
  borderRadius: '25px',
  border: '1px solid',
  borderTop: '1px solid',
  margin: '5px',
  height: '50px',
  width: '310px',
  position: 'relative',
  margin: 'auto',
  marginTop: '20px',
}
const legend = {
  backgroundColor: 'white',
  fontSize: '12px',
  position: 'absolute',
  width: 'auto',
  bottom: '-13px',
  right: '25px'
}
const input = {
  border: 'none',
  outline: 'none',
  fontSIze: '16px',
  position: 'absolute',
  bottom: '8px',
  left: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  width: '220px'
}
const title = {
  fontSize: '10px',
  position: 'absolute',
  top: '5px',
  left: '40px',
}

export default  withStyles(({ color, unit, display }) => {
  return ({
  fieldset: {
    display: display,
    ...fieldset,
    borderColor: color.lightGrey,
  },
  legend: {
    ...legend,
  },
  input: {
    ...input,
  },
  title: {
    ...title,
  },
  fieldsetInv: {
    display: display,
    ...fieldset,
    borderColor: 'red',
  },
  legendInv: {
    color: 'red',
    ...legend,
  },
  inputInv: {
    color: 'red',
    ...input,
  },
  titleInv: {
    color: 'red',
    ...title,
  },
  fieldsetVal: {
    display: display,
    ...fieldset,
    borderColor: color.darkPrimary,
  },
  legendVal: {
    color: color.darkPrimary,
    ...legend,
  },
  inputVal: {
    color: color.darkPrimary,
    ...input,
  },
  titleVal: {
    color: color.darkPrimary,
    ...title,
  }

})})(InputV)
