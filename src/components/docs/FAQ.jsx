import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Row, Col } from 'antd';

import Card from '../cards/Card'

const enhance = compose(
  withState('contactVisible', 'setContact', false),
);

const Faq = enhance(({ styles, ...props }) => {
  return (
    <div {...css(styles.container) }>
      <Row {...css(styles.cardRow)}>
        <Card
          title="One-Step Activation"
          body={`Vlynt makes deployment easy. Just add a single line of
              code to your <head> tag. Thats it.`}
          styles={styles}
        />
      </Row>
    </div>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
  },
  cardRow: {
    margin: 'auto',
    width: '100%',
    maxWidth: '1200px',
  },
}))(Faq)
