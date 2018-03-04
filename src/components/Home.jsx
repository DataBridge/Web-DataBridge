import React from 'react';
import { css, withStyles } from 'withStyles';
import { Row, Col } from 'antd';


function Home({ styles }) {
  return (
    <div {...css(styles.container)}>
      <Row {...css(styles.first)}>
        <Col lg={12} {...css(styles.firstText)}>
          <span {...css(styles.firstTextWrap)} >
            <p {...css(styles.firstTitle)}>
              Networked <br/> 
              Web Accelerator
            </p>
            <p {...css(styles.firstBody)}>
              Cut your client page land time <br/> 
              by up to 60% with a single line of code
            </p>
          </span>
        </Col>
        <Col lg={12} {...css(styles.firstGlobe)}>
          <img src="../../imgs/gen/globe.png" alt="globe" {...css(styles.globe)}/>
        </Col>
      </Row>

      <Row {...css(styles.second)}>
        <Row>
          <Col lg={12}>
            <span {...css(styles.secondTextWrap)}>
              <p {...css(styles.secondTitle)}>
                Introducing a new elegant <br/>
                and integrated approach
              </p>
              <p {...css(styles.secondBody)}>
                Vlynt removes CDN bottlenecks by enabling your users to load
                content directly from the nearest server or from another user, 
                with complete transparency and on any device. As your user 
                base grows, so does your reach. We are effectively building a 
                faster Internet on top of the older CDN model.
              </p>
              <p {...css(styles.secondBody)}>
                This means that the number of current Vlynt-enabled site users
                continues to rise with the total available network and computing
                capacity, providing a constantlyimproving online experience.
              </p>
            </span>
          </Col>
          <Col lg={12}>
            <img 
              src="../../imgs/home/comp.png"
              alt="computers"
              {...css(styles.speedComp)}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <img 
              src="../../imgs/home/speed.png"
              alt="speed"
              {...css(styles.speedComp)}
            />
          </Col>
          <Col lg={12}>
            <span {...css(styles.secondTextWrap)}>
              <p {...css(styles.secondTitle)}>
                Dramatic Performance <br/>
                Upgrades
              </p>
              <p {...css(styles.secondBody)}>
                The Vlynt Web Accelerator is an out-of-the-box CDN 
                solution that relies on p2p networks to send data that
                have already been retrieved. This enables you to deliver 
                data from a close source directly to your client, and 
                when more clients retrieve the same data, that content 
                will be delivered faster than ever before.
              </p>
              <p {...css(styles.secondBody)}>
                The Vlynt Web Accelerator is an out-of-the-box CDN solution that
                relies on p2p networks to send data that have already been 
                retrieved.
                This enables you to deliver data from a close source directly
                to your client, and when more clients retrieve the same data, 
                that content will be delivered faster than ever before.
              </p>
            </span>
          </Col>
        </Row>
      </Row>

      <Row {...css(styles.third)}>
        <Row {...css(styles.thirdHead)}>
          <p {...css(styles.thirdHeadTitle)}>
            Why use Vlynt?
          </p>
          <p {...css(styles.thirdHeadBody)}>
            Deliver the best user experience <br/>
            consistently, regardless of user location
          </p>
        </Row>

        <Row>
          <Col lg={8} md={12} {...css(styles.cardContainer)}>
            <div {...css(styles.card)}>
              <img 
                src="../../imgs/home/1.png"
                alt="card"
                {...css(styles.cardImg)}
              />
              <p {...css(styles.cardTitle)}>
                One-Step Activation
              </p>
              <p {...css(styles.cardBody)}>
                Vlynt makes deployment easy. Just add a single line of
                code to your {'<'}head{'>'} tag. That's it.
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} {...css(styles.cardContainer)}>
            <div {...css(styles.card)}>
              <img 
                src="../../imgs/home/2.png"
                alt="card"
                {...css(styles.cardImg)}
              />
              <p {...css(styles.cardTitle)}>
                In-Depth Insights
              </p>
              <p {...css(styles.cardBody)}>
                Real-time and historical insights from actual user experience.
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} {...css(styles.cardContainer)}>
            <div {...css(styles.card)}>
              <img 
                src="../../imgs/home/3.png"
                alt="card"
                {...css(styles.cardImg)}
              />
              <p {...css(styles.cardTitle)}>
                Real-User ;etrics
              </p>
              <p {...css(styles.cardBody)}>
                Real page load and performance metrics on every page visit.
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} {...css(styles.cardContainer)}>
            <div {...css(styles.card)}>
              <img 
                src="../../imgs/home/4.png"
                alt="card"
                {...css(styles.cardImg)}
              />
              <p {...css(styles.cardTitle)}>
                Paradigm Shift from CDNs
              </p>
              <p {...css(styles.cardBody)}>
                Your users need content: They expect you to deliver it seamlessly
                and they want it now.
              </p>
            </div>
          </Col>
          <Col lg={8} md={12} {...css(styles.cardContainer)}>
            <div {...css(styles.card)}>
              <img 
                src="../../imgs/home/5.png"
                alt="card"
                {...css(styles.cardImg)}
              />
              <p {...css(styles.cardTitle)}>
                Easy to use
                One-Step Activation
              </p>
              <p {...css(styles.cardBody)}>
                Vlynt makes deployment easy. Just add a single line of
                code to your {'<'}head{'>'} tag. That's it.
              </p>
            </div>
          </Col>
        </Row>

      </Row>

    </div>
  );
}

export default  withStyles(({ color, unit }) => ({
    container: {
    },

    first: {
      backgroundImage: color.gradientLeft,
      textAlign: 'center',
    },
    firstText: {
      color: 'white',
    },
    firstGlobe: {
      color: 'white',
    },
    firstTextWrap: {
      marginTop: '100px',
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
      marginTop: '30px',
    },
    speedComp: {
      width: '15.95cm',
      height: '16.55cm',
    },
    secondTextWrap: {
      marginTop: '30px',
      marginBottom: '30px',
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

    thrid: {
    },
    thirdHead: {
      color: color.tabBlue,
      textAlign: 'center',
    },
    thirdHeadTitle: {
      fontSize: '48px',
    },
    thirdHeadBody: {
      fontSize: '24px',
      fontWeight: '400'
    },
    cardContainer: {
      textAlign: 'center',
    },
    card: {
      width: '380px',
      height: '300px',
      boxShadow: '0 0 20px 10px rgba(0, 0, 0, .2)',
      margin: 'auto',
      marginTop: '30px',
      marginBottom: '30px',
      color: color.tabBlue,
    },
    cardImg: {
      width: '3.75cm',
      height: '3.95cm',
    },
    cardTitle: {
      marginTop: '20px',
      fontSize: '24px',
    },
    cardBody: {
      marginTop: '-20px',
      fontSize: '14px',
    },
  }))(Home)

