import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from 'antd';

import Card from './cards/Card'
import EarthAnimation from './animations/EarthAnimation'
import CompAnimation from './animations/CompAnimation'

function Modal({ styles, text, visible }) {
  const handleClick = e => {
    alert('thug')
  }
  return (
    <div
      {...css(styles.modal)}
      onClick={_ => visible(false)}
    >
      <div {...css(styles.modalContent)}>
        {text}
      </div>
    </div>
  )
}


const enhanceHome = compose(
  withState('contactVisible', 'setContact', false),
);
const Home = enhanceHome(({ styles, ...props }) => {
  return (
    <div {...css(styles.container) }>
      <Row {...css(styles.first) }>
        <Col lg={12} {...css(styles.firstText) }>
          <span {...css(styles.firstTextWrap) } >
            <p {...css(styles.firstTitle) }>
              Networked <br />
              Web Accelerator
            </p>
            <p {...css(styles.firstBody) }>
              Cut your content delivery costs <br />
              by up to 60% with a single line of code
            </p>
            <button
              {...css(styles.firstContact)}
              onClick={_ => props.setContact(true)}
            >
              CONTACT US
            </button>
            {props.contactVisible ?
            <Modal
              styles={styles}
              visible={props.setContact}
              text={(
                <span>
                Contact us. <br/>
                <hr/>
                  <a href="mailto:contact.us@vlynt.com?Subject=Hello%20again">contact.us@vlynt.com</a>
                </span>
              )}
            /> :
            null}
          </span>
        </Col>
        <Col lg={12} {...css(styles.firstGlobe) }>
          <EarthAnimation {...css(styles.globe) } />
        </Col>
      </Row>

      <Row {...css(styles.second) }>
        <Row>
          <Col lg={12}>
            <span {...css(styles.secondTextWrap) }>
              <p {...css(styles.secondTitle) }>
                Introducing a new elegant <br />
                and integrated approach
              </p>
              <p {...css(styles.secondBody) }>
                Vlynt removes CDN bottlenecks by enabling your users to load
                content directly from another user,
                with complete transparency and on any device. As your user
                base grows, so does your reach. We are effectively building a
                faster Internet on top of the older CDN model.
              </p>
              <p {...css(styles.secondBody) }>
                With zero risk of implementation, the Vlynt Web Accelerator can
                begin operating in minutes regardless of location or underlying
                infrastructure.
              </p>
            </span>
          </Col>
          <Col lg={12} {...css(styles.secondImg) }>
            <CompAnimation/>
          </Col>
        </Row>

        <Row>
          <Col lg={12} {...css(styles.secondImg) }>
            <img
              src="../../imgs/home/speed.png"
              alt="speed"
              {...css(styles.speedComp) }
            />
          </Col>
          <Col lg={12}>
            <span {...css(styles.secondTextWrap) }>
              <p {...css(styles.secondTitle) }>
                Dramatic Performance <br />
                Upgrades
              </p>
              <p {...css(styles.secondBody) }>
                The Vlynt Web Accelerator is an out-of-the-box CDN
                solution that relies on p2p networks to send data that
                has already been retrieved. This enables you to deliver
                data from a close source directly to your client, and
                when more clients retrieve the same data, that content
                will be delivered faster than ever before.
              </p>
              <p {...css(styles.secondBody) }>
                This means that the number of current Vlynt-enabled site users
                continues to rise along with the total available network and computing
                capacity, providing a constantly improving online experience.
              </p>
            </span>
          </Col>
        </Row>
      </Row>

      <Row {...css(styles.third)}>
        <Row {...css(styles.thirdHead) }>
          <p {...css(styles.thirdHeadTitle) }>
            Why use Vlynt?
          </p>
          <p {...css(styles.thirdHeadBody) }>
            Deliver the best user experience <br />
            consistently, regardless of user location
          </p>
        </Row>

        <Row {...css(styles.cardRow)}>
          <Card
            title="One-Step Activation"
            body={`Vlynt makes deployment easy. Just add a single line of
                code to your <head> tag. That's it.`}
            imgPath="../../imgs/home/1.png"
            styles={styles}
          />
          <Card
            title="In-Depth Insights"
            body={`Real-time and historical insights from actual user experience.`}
            imgPath="../../imgs/home/2.png"
            styles={styles}
          />
          <Card
            title="Real-User Metrics"
            body={`Real page load and performance metrics on every page visit.`}
            imgPath="../../imgs/home/3.png"
            styles={styles}
          />
          <Card
            title="Routing"
            body={`Your users need content: They expect you to deliver it seamlessly
                and they want it now. Vlynt finds the fastest route for every user.
                Be it a peer or a server.`}
            imgPath="../../imgs/home/4.png"
            styles={styles}
          />
          <Card
            title="Paradigm Shift from CDNs"
            body={`Vlynt offers an ecologically clean alternative to server access,
            dramatically reducing bandwidth costs and scaling dynamically as your
            reach grows.`}
            imgPath="../../imgs/home/6.png"
            styles={styles}
          />
          <Card
            title="Simple Integration"
            body={`Vlynt can be added seamlessly on top of your existing
              architecture in a few clicks and dynamically integrates your
              existing servers and CDNs into a single network.`}
            imgPath="../../imgs/home/5.png"
            styles={styles}
          />
        </Row>

      </Row>

    </div>
  );
});

export default withStyles(({ color, unit }) => ({
  container: {
  },

  first: {
    backgroundImage: `url("../../imgs/home/stars.png"), ${color.gradientLeft}`,
    textAlign: 'center',
    paddingBottom: '50px',
  },
  firstContact: {
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
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: '300px',
    height: '100px',
    left: '50%',
    top: '25%',
    marginLeft: '-150px',
    backgroundColor: 'black',
    borderRadius: '15px',
    backgroundColor: 'white',
    color: color.darkPrimary,
    fontSize: '18px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px'
  },
  firstText: {
    color: 'white',
  },
  firstGlobe: {
    color: 'white',
  },
  firstTextWrap: {
    marginTop: '120px',
    display: 'inline-block',
    textAlign: 'left',
  },
  firstTitle: {
    fontSize: '50px',
  },
  firstBody: {
    marginTop: '-30px',
    fontSize: '24px',
  },

  second: {
    textAlign: 'center',
    marginTop: '120px',
  },
  speedComp: {
    width: '15.95cm',
    height: '16.55cm',
  },
  secondTextWrap: {
    marginTop: '100px',
    display: 'inline-block',
    textAlign: 'left',
    color: color.tabBlue
  },
  secondTitle: {
    fontSize: '36px',
  },
  secondBody: {
    fontSize: '17px',
    width: '12cm',
  },
  secondImg: {
    marginTop: '100px',
  },


  third: {
    marginTop: '120px',
  },
  thirdHead: {
    color: color.tabBlue,
    textAlign: 'center',
    paddingBottom: '50px',
  },
  thirdHeadTitle: {
    fontSize: '48px',
  },
  thirdHeadBody: {
    fontSize: '24px',
    fontWeight: '400'
  },

  cardRow: {
    margin: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
}))(Home)
