import React from 'react';
import { withApollo } from 'react-apollo';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import InputV from 'components/input/InputV';
import InfoTitle from './InfoTitle';
import CreateCustomerMutation from 'data/mutations/CreateCustomerMutation';
import { withRouter } from 'react-router-dom'



const enhance = compose(
  withState('stateEmail', 'setStateEmail', 'empty'),
  withState('statePwd', 'setStatePwd', 'empty'),
  withState('stateCPwd', 'setStateCPwd', 'empty'),
  withState('stateFn', 'setStateFn', 'empty'),
  withState('stateLn', 'setStateLn', 'empty'),
  withState('stateComp', 'setStateComp', 'empty'),
  withState('emailValue', 'setEmailValue', null),
  withState('pwdValue', 'setPwdValue', null),
  withState('cpwdValue', 'setCPwdValue', null),
  withState('fnValue', 'setFnValue', null),
  withState('lnValue', 'setLnValue', null),
  withState('compValue', 'setCompValue', null),
  withHandlers({
    validEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'valid'),
    invalidEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'invalid'),
    emptyEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'empty'),

    validPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'valid'),
    invalidPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'invalid'),
    emptyPwd: ({ setStatePwd }) => () => setStatePwd(_ => 'empty'),

    validCPwd: ({ setStateCPwd }) => () => setStateCPwd(_ => 'valid'),
    invalidCPwd: ({ setStateCPwd }) => () => setStateCPwd(_ => 'invalid'),
    emptyCPwd: ({ setStateCPwd }) => () => setStateCPwd(_ => 'empty'),

    validFn: ({ setStateFn }) => () => setStateFn(_ => 'valid'),
    invalidFn: ({ setStateFn }) => () => setStateFn(_ => 'invalid'),
    emptyFn: ({ setStateFn }) => () => setStateFn(_ => 'empty'),

    validLn: ({ setStateLn }) => () => setStateLn(_ => 'valid'),
    invalidLn: ({ setStateLn }) => () => setStateLn(_ => 'invalid'),
    emptyLn: ({ setStateLn }) => () => setStateLn(_ => 'empty'),

    validComp: ({ setStateComp }) => () => setStateComp(_ => 'valid'),
    invalidComp: ({ setStateComp }) => () => setStateComp(_ => 'invalid'),
    emptyComp: ({ setStateComp }) => () => setStateComp(_ => 'empty')
  }),
  graphql(CreateCustomerMutation, { name: 'createCustomer' },
  ),
  withRouter,
)
const SignUpTab = enhance(({ styles, children, stateEmail, statePwd, stateCPwd,
  stateFn, stateLn, stateComp, validEmail,
  invalidEmail, emptyEmail, validPwd, invalidPwd, emptyPwd,
  validCPwd, invalidCPwd, emptyCPwd, validFn, invalidFn, emptyFn,
  validLn, invalidLn, emptyLn, validComp, invalidComp, emptyComp, ...props }) => {

  const createCustomer = () => {
    props.createCustomer({
      variables: {
        input: {
          email: props.emailValue,
          password: props.pwdValue,
          first_name: props.fnValue,
          last_name: props.lnValue,
          company: props.compValue,
        }
      },
    });
    props.history.push('/login')
  }

  let logInButton;
  console.log(props.createCustomer)



  if ((stateEmail === 'valid') && (statePwd === 'valid') &&
    (stateCPwd === 'valid') && (stateFn === 'valid') &&
    (stateLn === 'valid') && (stateComp === 'valid'))
    logInButton = (
      <button
        type="button"
        {...css(styles.logInButton)}
        onClick={createCustomer}
      >
        SIGN UP
      </button>
    )
  else
    logInButton = (
      <button
        type="button"
        {...css(styles.logInButtonDisabled)}
        disabled
      >
        SIGN UP
      </button>
    )

  return (
    <div {...css(styles.container)}>
      <InfoTitle text="ACCOUNT INFO" />
      <InputV
        placeholder="Email"
        validate={(x) => x.length > 3}
        state={stateEmail}
        valid={validEmail}
        invalid={invalidEmail}
        empty={emptyEmail}
        setValue={props.setEmailValue}
        {...css(styles.input)}
      />
      <InputV
        placeholder="Password"
        validate={(x) => x.length > 3}
        state={statePwd}
        valid={validPwd}
        invalid={invalidPwd}
        empty={emptyPwd}
        setValue={props.setPwdValue}
        {...css(styles.input)}
      />
      <InputV
        placeholder="Confirm Password"
        validate={(x) => x.length > 3}
        state={stateCPwd}
        valid={validCPwd}
        invalid={invalidCPwd}
        empty={emptyCPwd}
        setValue={props.setCPwdValue}
        {...css(styles.input)}
      />
      <InfoTitle text="PERSONAL INFO" />
      <InputV
        placeholder="First Name"
        validate={(x) => x.length > 3}
        state={stateFn}
        valid={validFn}
        invalid={invalidFn}
        empty={emptyFn}
        setValue={props.setFnValue}
        {...css(styles.input)}
      />
      <InputV
        placeholder="Last Name"
        validate={(x) => x.length > 3}
        state={stateLn}
        valid={validLn}
        invalid={invalidLn}
        empty={emptyLn}
        setValue={props.setLnValue}
        {...css(styles.input)}
      />
      <InputV
        placeholder="Company"
        validate={(x) => x.length > 3}
        state={stateComp}
        valid={validComp}
        invalid={invalidComp}
        empty={emptyComp}
        setValue={props.setCompValue}
        {...css(styles.input)}
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
  height: '50px',
  color: 'white',
  borderRadius: '25px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '20px',
  outline: 'none',
}

export default withStyles(({ color, unit }) => ({
  container: {
    paddingTop: '10px',
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
}))(SignUpTab)
