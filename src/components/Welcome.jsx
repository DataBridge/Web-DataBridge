import React from 'react';
import { css, withStyles } from 'withStyles';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';
import InputV from 'components/input/InputV';
import Primary from 'components/buttons/Primary';
import MeQuery from 'data/queries/MeQuery';

const enhance = compose(
  withState('stateSite', 'setStateSite', 'empty'),
  withState('siteValue', 'setSiteValue', null),
  withHandlers({
    validSite: ({ setStateSite }) => () => setStateSite(_ => 'valid'),
    invalidSite: ({ setStateSite }) => () =>  setStateSite(_ => 'invalid'),
    emptySite: ({ setStateSite }) => () => setStateSite(_ => 'empty'),
  }),
  graphql(MeQuery, {
    options: () => ({
      skip: !localStorage.getItem('token'),
    })
  }),
);

const Modal = enhance(({ styles, data, ...props }) => {
  const isActivated = localStorage.getItem('activated');

  const websiteInput = (
    <div {...css(styles.modal)}>
      Please add your website below to start accelerating.
      <InputV
        placeholder="Enter website name"
        validate={_ => true}
        display="inline-block"
        state={props.stateSite}
        valid={props.validSite}
        invalid={props.invalidSite}
        empty={props.emptySite}
        setValue={props.setSiteValue}
      />
      &nbsp; &nbsp;
      <Primary text="ADD" />
    </div>
  );

  const personalisedMessage = (data && data.me) ? `Hello ${data.me.first_name}!` : '';
  const waitingForActivation = (
    <div {...css(styles.modal)}>
      <div {...css(styles.info)}>
        <span {...css(styles.text)}>
          {personalisedMessage} Thank you for choosing Vlynt.
          <br></br>
          Please wait for the activation of your account.
        </span>
      </div>
    </div>
  );

  const toDisplay = (isActivated) ? websiteInput : waitingForActivation;
  return (
    toDisplay
  );
});

function Welcome({ styles }) {
  return (
    <div {...css(styles.container)}>
      <span {...css(styles.welcomeText)}>
        <p> Welcome to Vlynt </p>
      </span>
      <Modal styles={styles}/>
      <img src="../../imgs/gen/globe.png" alt="log_rgb" {...css(styles.globe)}/>
    </div>);
}

export default  withStyles(({ color, unit }) => ({
    container: {
      boxShadow: 'inset 0 7px 12px -7px rgba(0,0,0,0.4)',
      backgroundImage: color.gradientLeft,
      textAlign: 'right',
    },
    globe: {
      marginRight: '10%',
      marginTop: '20px',
    },
    welcomeText: {
      position: 'absolute',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // marginLeft: '-203px',
      top: '180px',
      fontSize: '50px',
      color: 'white',
    },
    modal: {
      paddingTop: '40px',
      position: 'relative',
      left: '50%',
      top: '250px',
      marginLeft: '-285px',
      width: '570px',
      height: '180px',
      backgroundColor: 'white',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 0 20px 10px rgba(0, 0, 0, .2)',
    },
    info: {
      display: 'flex',
      'vertical-align': 'middle',
      'align-items': 'center',
      'justify-content': 'center'
    },
    text: {
      fontSize: '18px',
    },
  }))(Welcome)
