import React from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin } from 'antd';
import InputV from 'components/input/InputV';
import LoginQuery from 'data/queries/LoginQuery';

const enhance = compose(
  withState('stateEmail', 'setStateEmail', 'empty'),
  withState('statePwd', 'setStatePwd', 'empty'),
  withState('emailValue', 'setEmailValue', null),
  withState('pwdValue', 'setPwdValue', null),
  withState('login', 'setLogin', null),
  withHandlers({
    validEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'valid'),
    invalidEmail: ({ setStateEmail }) => () =>  setStateEmail(_ => 'invalid'),
    emptyEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'empty'),
    validPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'valid'),
    invalidPwd: ({ setStatePwd }) => () =>  setStatePwd(_ => 'invalid'),
    emptyPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'empty')
  }),
  graphql(LoginQuery, {
    options: ({ emailValue, pwdValue, login, }) => ({
      variables: { email: emailValue, password: pwdValue },
      skip: !login,
    })
  }),
  withRouter,
)
const LogInTab = enhance(({ styles, children, stateEmail, statePwd, validEmail, 
  invalidEmail, emptyEmail, validPwd, invalidPwd, emptyPwd, emailValue, pwdValue,
  setEmailValue, setPwdValue, login, setLogin, data, history }) => {
  let logInButton;
  const validForm = (stateEmail === 'valid') && (statePwd === 'valid');
  if (validForm)
    logInButton = (
      <button 
        type="button" 
        {...css(styles.logInButton)}
        onClick={() => setLogin(true)}
      >
        LOGIN
      </button>
    )
  else
    logInButton = (
      <button 
        type="button"
        {...css(styles.logInButtonDisabled)}
        disabled
      >
        LOGIN
      </button>
    )

  if (data && data.loading)
    return (
      <div {...css(styles.container)}>
        <Spin size="large" /> 
      </div>
  )

  if (data && data.signIn.errors)
    console.log(data.signIn.errors);

  if (data && !data.signIn.errors) {
    localStorage.setItem('token', data.signIn.jwt);
    history.push('/welcome')
  }

  return (
    <div {...css(styles.container)}>
      <InputV 
        placeholder="Email"
        validate={(x) => x.length > 3}
        state={stateEmail}
        valid={validEmail}
        invalid={invalidEmail}
        empty={emptyEmail}
        setValue={setEmailValue}
        {...css(styles.input)}
      />
      <InputV 
        placeholder="Password"
        validate={(x) => x.length > 3}
        state={statePwd}
        valid={validPwd}
        invalid={invalidPwd}
        setValue={setPwdValue}
        empty={emptyPwd}
      />
      {logInButton}
      <p {...css(styles.terms)}>
        Terms and conditions
      </p>
    </div>
  )
});

const logInButton = {
  width: '310px',
  color: 'white',
  height: '50px',
  borderRadius: '25px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '20px',
  outline: 'none',
}

export default  withStyles(({ color, unit }) => ({
  container: {
    paddingTop: '20px',
    textAlign: 'center',
  },
  terms: {
    marginTop: '20px',
    color: color.lightPrimary,
  },
  logInButton: {
    backgroundColor: color.lightPrimary,
    cursor: 'pointer',
    ...logInButton,
  },
  logInButtonDisabled: {
    backgroundColor: color.lightGrey,
    ...logInButton,
  },
  }))(LogInTab)