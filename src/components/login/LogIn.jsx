import React from 'react';
import { withApollo } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import Tabs from 'components/tabs/Tabs';
import LogInTab from './LogInTab';
import SignUpTab from './SignUpTab';
import LoginQuery from 'data/queries/LoginQuery';


function LogIn ({ styles }) {
  return (
    <div {...css(styles.container)}>
      <img src="../../imgs/logos/logo_rgb.png" alt="log_rgb" {...css(styles.logo)}/>
      <Tabs 
        titles={['LOGIN', 'SIGN UP']}
        comps={[
          <LogInTab/>,
          <SignUpTab/>,
        ]}
      />
    </div>
  )
}

export default  withStyles(({ color, unit }) => ({
    container: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 0 20px 10px rgba(0, 0, 0, .1)',
      width: '370px',
      position: 'absolute',
      top: '10%',
      left: '50%',
      marginLeft: '-185px',
      marginTop: '40px',
      paddingBottom: '20px',
    },
    logo: {
      margin: 'auto', 
      display: 'block',
      width: '4.34cm',
      height: '1.76cm',
      marginBottom: '30px',
      marginTop: '30px',
    },
  }))(LogIn)