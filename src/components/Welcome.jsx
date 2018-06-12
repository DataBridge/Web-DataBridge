import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import InputV from 'components/input/InputV';
import Primary from 'components/buttons/Primary';

const enhance = compose(
  withState('stateSite', 'setStateSite', 'empty'),
  withState('siteValue', 'setSiteValue', null),
  withHandlers({
    validSite: ({ setStateSite }) => () => setStateSite(_ => 'valid'),
    invalidSite: ({ setStateSite }) => () =>  setStateSite(_ => 'invalid'),
    emptySite: ({ setStateSite }) => () => setStateSite(_ => 'empty'),
  }),
);
const Modal = enhance(({ styles, ...props }) => {
  return (
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
      <Primary text="ADD"/>
    </div>
  )
});

function Welcome({ styles }) {
  return (
    <div {...css(styles.container)}>
      <span {...css(styles.text)}>
        Welcome to Vlynt
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
    text: {
      position: 'absolute',
      left: '50%',
      marginLeft: '-203px',
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
  }))(Welcome)


