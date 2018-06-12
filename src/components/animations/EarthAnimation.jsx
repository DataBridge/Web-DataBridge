import React from 'react';
import { css, withStyles } from 'withStyles';
import Animation from './Animation';
import * as earthAnimationData from '../../../imgs/animations/earth_loop.json';

const EarthAnimation = ({ width, height, styles }) => {
  const alt = '../../imgs/gen/globe.png';

  return (
    <div {...css(styles.animation) }>
      <Animation src={earthAnimationData} width={width} height={height} style={styles.animation}/>
    </div>
  )
}

export default withStyles(({ color, unit }) => ({
  animation: {
    margin: '-60px auto -60px',
    'clip-path': 'inset(15% 1% 1% 11%)',
    width: 750,
    height: 750
  }
}))(EarthAnimation)
