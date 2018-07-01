import React from 'react';
import { css, withStyles } from 'withStyles';
import Animation from './Animation';
import * as earthAnimationData from '../../../imgs/animations/earth_loop.json';

const EarthAnimation = ({ width, height, styles }) => {
  const alt = '../../imgs/gen/globe.png';

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    return (
      <img src="../../imgs/gen/globe.png" alt="globe" {...css(styles.globe) } />
    )
  }


  return (
    <div id="HOLA" {...css(styles.animation) }>
      <Animation src={earthAnimationData} width={width} height={height} style={styles.animation}/>
    </div>
  )
}

export default withStyles(({ color, unit }) => ({
  animation: {
    transform: 'translateZ(0)',
    'will-change': 'transform',
    margin: '-60px auto -60px',
    'clip-path': 'inset(15% 1% 1% 11%)',
    '-webkit-clip-path':'inset(15% 1% 1% 11%)',
    width: 750,
    height: 750
  }
}))(EarthAnimation)
