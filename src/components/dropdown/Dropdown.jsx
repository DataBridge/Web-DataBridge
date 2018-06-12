import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';

const enhance = compose(
  withState('stateSelect', 'setStateSelect', 'empty'),
  withHandlers({
    validEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'valid'),
    invalidEmail: ({ setStateEmail }) => () =>  setStateEmail(_ => 'invalid'),
    emptyEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'empty'),
    validPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'valid'),
    invalidPwd: ({ setStatePwd }) => () =>  setStatePwd(_ => 'invalid'),
    emptyPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'empty')
  }),
);
const Dropdown = enhance(({ styles, values }) => {
  return (
    <div {...css(styles.container)}>
      <div {...css(styles.icon)}/>
    </div>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
    borderRadius: '25px',
    width: '100%',
    height: '50px',
    border: '1px solid',
    borderColor: color.lightGrey,
    position: 'relative',
    display: 'inline-block',
  },
  icon: {
    width: '60px',
    height: '50px',
    border: '1px solid',
    borderColor: color.lightGrey,
    backgroundColor: 'black',
    borderRadius: '25px',
    position: 'absolute',
    right: 0,
    opacity: 0.7,
  },
}))(Dropdown)