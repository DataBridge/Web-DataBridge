import React from 'react';
import { Link } from 'react-router-dom';
import { css, withStyles } from 'withStyles';
import { Row, Col } from 'antd';


function Menu({ styles }) {
  return (
    <ul {...css(styles.mainMenuUl)}>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/solutions" {...css(styles.link)}> 
          Solutions 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/features" {...css(styles.link)}> 
          Features 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/faq" {...css(styles.link)}> 
          FAQ 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/pricing" {...css(styles.link)}> 
          Pricing 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/studies" {...css(styles.link)}> 
          Case studies 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/blog" {...css(styles.link)}> 
          Blog 
        </Link>
      </li>
      <li {...css(styles.mainMenuLi)}>
        <Link to="/contact" {...css(styles.link)}> 
          Contact 
        </Link>
      </li>
    </ul>
  )
}

function Footer({ styles, text}) {
  return (
    <Row {...css(styles.container)}>
        <Row>
          <Col span={2}>
            <img 
              src="../../imgs/logos/logo_footer.png"
              alt="log_footer"
              {...css(styles.logo)}
            />
          </Col>
          <Col span={11}>
          </Col>
          <Col span={11}>
            <Menu styles={styles}/>
          </Col>
        </Row>

        <hr {...css(styles.sep)}/>

        <Row {...css(styles.secondRow)}>
          <Col span={2} {...css(styles.at)}>
            @ Vlynt 2018
          </Col>
          <Col span={3}>
            <Link to="/terms" {...css(styles.terms)}> 
              Privacy & Terms 
            </Link>
          </Col>
          <Col span={15}>
          </Col>
          <Col span={2} {...css(styles.at)}>
            Follow us:
          </Col>
          <Col span={2} {...css(styles.socialContainer)}>
            <img 
              src="../../imgs/icons/facebook.png"
              alt="facebook"
              {...css(styles.social)}
            />
            <img 
              src="../../imgs/icons/twitter.png"
              alt="twitter"
              {...css(styles.social)}
            />
            <img 
              src="../../imgs/icons/instagram.png"
              alt="instagram"
              {...css(styles.social)}
            />
          </Col>
        </Row>
    </Row>
  )
} 

export default  withStyles(({ color, unit }) => ({
  container: {
    marginTop: '20px',
    width: '100%',
    height: '130px%',
    paddingRight: '50px',
    paddingLeft: '50px',
  },
  mainMenuUl: {
    width: '100%',
    textAlign: 'right'
  },
  mainMenuLi: {
    marginLeft: '1%',
    marginRight: '1%',
    display: 'inline',
    fontSize: '14px',
    width: '200px',
    textAlign: 'center',
  },
  link: {
    color: color.lightPrimary,
  },
  secondRow: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  logo: {
    width: '0.917in',
    height: '0.194in',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  social: {
    width: '0.222',
    height: '0.194',
  },
  terms: {
    fontSize: '12px',
  },
  at: {
    fontSize: '12px',
    color: color.tabBlue,
  },
  sep: {
    width: '90%',
    border: '1px solid',
    borderColor: color.hrGrey,
  }
}))(Footer)