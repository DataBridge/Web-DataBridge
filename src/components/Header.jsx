import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { withState } from 'recompose';
import { Row, Col, Spin } from 'antd';
import { compose } from 'recompose';
import MeQuery from 'data/queries/MeQuery';

function LoginSignup({ styles }) {
  return (
    <ul {...css(styles.mainMenuUl)}>
      <li 
        {...css(styles.loginSignup)}
      > 
        <Link to="/login" {...css(styles.login)}> LOGIN </Link> 
      </li>
      <li
        {...css(styles.loginSignup)}
      >
        <Link to="/signup" {...css(styles.signup)}> 
          SIGN UP 
        </Link>
      </li>
    </ul>
  )
} 

const enhance = compose(
  graphql(MeQuery, {
    options: () => ({
      skip: !localStorage.getItem('token'),
    })
  }),
);
const CustomerMenu = enhance(({ styles, data }) => {
  let Comp;
  if (data && data.me)
    Comp = (
    <ul {...css(styles.mainMenuUl)}>
      <li {...css(styles.mainMenuLi)}> Hi {data.me.email} !</li>
      <li {...css(styles.mainMenuLi)}> Your Account </li>
      <li {...css(styles.mainMenuLi)}> 
        <Link to="/panel"> 
          Admin Panel
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}> 
        LOG OUT
      </li>
    </ul>
      
    );
  else
    Comp = (
      <Spin/>
    );

  return (
    <div>
      {Comp}
    </div>
  )
})

const MainMenu = ({ styles }) => {
  return (
    <ul {...css(styles.mainMenuUl)}>
      <li {...css(styles.mainMenuLi)}> Solutions </li>
      <li {...css(styles.mainMenuLi)}> Features </li>
      <li {...css(styles.mainMenuLi)}> Pricing </li>
      <li {...css(styles.mainMenuLi)}> FAQ </li>
      <li {...css(styles.mainMenuLi)}> Case studies </li>
      <li {...css(styles.mainMenuLi)}> Blog </li>
      <li {...css(styles.mainMenuLi)}> Contact </li>
    </ul>
  )
};

function Header({ styles}) {
  const MenuSpe = localStorage.getItem('token') ? CustomerMenu : LoginSignup;
  const Menu = localStorage.getItem('token') ? 
    (
      <span>
        <Col span={20} {...css(styles.colMainMenu)}>
          <MenuSpe styles={styles} />
        </Col>
      </span>
    ) : (
      <span>
        <Col span={15} {...css(styles.colMainMenu)}>
          <MainMenu styles={styles} />
        </Col>
        <Col span={5} {...css(styles.colMainMenu)}>
          <MenuSpe styles={styles} />
        </Col>
      </span>
    )
  const simulateClick = () => {
    document.getElementById('contact-us').click();
  }
  return (
    <Row {...css(styles.container)}>
      <Col span={4} {...css(styles.colLogo)}>
        <img src="../../imgs/logos/logo_white.png" alt="log_rgb" {...css(styles.logo)}/>
      </Col>
      <Col span={15}/>
      <Col span={5} {...css(styles.contactContainer)}>
        <button 
          {...css(styles.contactButton)} 
          onClick={simulateClick}
        >
          CONTACT US
        </button>
      </Col>
    </Row>
  )
} 


export default  withStyles(({ color, unit }) => ({
  container: {
    backgroundImage: color.gradientLeft,
    color: 'white',
    height: '80px',
  },
  colMainMenu: {
    textAlign: 'center',
    paddingTop: '25px',
  },
  colLogo: {
    paddingTop: '10px',
    textAlign: 'center',
    height: '100%'
  },
  mainMenuUl: {
    width: '100%',
  },
  mainMenuLi: {
    color: 'white',
    marginLeft: '1%',
    marginRight: '1%',
    display: 'inline',
    fontSize: '18px',
    width: '200px',
    textAlign: 'center',
  },
  loginSignup: {
    color: 'white',
    display: 'inline',
    marginLeft: '1%',
    marginRight: '1%',
  },
  login: {
    color: 'white',
  },
  signup: {
    color: 'white',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '17px',
    width: '120px',
    height: '34px',
    border: '1px solid white',
    display: 'inline-block'
  },
  logo: {
    width: '3.81cm',
    height: '1.41cm'
  },
  contactContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: '2px solid white',
    width: '180px',
    height: '56px',
    borderRadius: '27px',
    fontSize: '18px',
    ':hover': {
      cursor: 'pointer',
    },
  },
  }))(Header)