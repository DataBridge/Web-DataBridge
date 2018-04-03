import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from 'antd';


const enhance = compose(
  withState('stateHover', 'setStateHover', false),
  withHandlers({
    hover: ({ setStateHover }) => () => setStateHover(_ => true),
    unhover: ({ setStateHover }) => () =>  setStateHover(_ => false),
  }),
);
const Card = enhance(({ styles, title, body, imgPath, ...props }) => {
  let cssStyle;
  let img;
  if (props.stateHover) {
    cssStyle = 'cardHover';
    img = null
  } else {
    cssStyle = 'card';
    img = (
        <img
          src={imgPath}
          alt="card"
          {...css(styles.cardImg) }
        />
    );
  }
  return (
    <Col
      lg={8} md={12}
      {...css(styles.cardContainer)}
    >
      <div
        {...css(styles[cssStyle])}
        onMouseEnter={props.hover}
        onMouseLeave={props.unhover}
      >
        {img}
        <p {...css(styles.cardTitle) }>
          {title}
        </p>
        <p {...css(styles.cardBody) }>
          {body}
        </p>
      </div>
    </Col>
  )
});

export default  withStyles(({ color, unit, display }) => ({
  cardContainer: {
    textAlign: 'center',
  },
  card: {
    borderRadius: '10px',
    width: '380px',
    height: '400px',
    boxShadow: '0 0 20px 2px rgba(0, 0, 0, .2)',
    margin: 'auto',
    marginTop: '30px',
    marginBottom: '30px',
    color: color.tabBlue,
    paddingTop: '50px',
    paddingRight: '50px',
    paddingLeft: '50px',
  },
  cardHover: {
    borderRadius: '10px',
    width: '380px',
    height: '400px',
    boxShadow: '0 0 20px 10px rgba(0, 0, 0, .2)',
    margin: 'auto',
    marginTop: '30px',
    marginBottom: '30px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.darkPrimary,
    paddingRight: '50px',
    paddingLeft: '50px',
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
}))(Card)
