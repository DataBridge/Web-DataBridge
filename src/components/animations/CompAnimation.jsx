import React from 'react';
import { css, withStyles } from 'withStyles';
import Animation from './Animation';
import * as compAnimationData from '../../../imgs/animations/pc_loop.json';

const CompAnimation = ({ width, height, styles }) => {
  const alt = '../../imgs/home/comp.png';
  return (
    <div {...css(styles.animation)}>
      <Animation src={compAnimationData} width={width} height={height} style={styles.animation}/>
    </div>
  )
}

export default withStyles(({ color, unit }) => ({
  animation: {
    margin: 'auto',
    'clip-path': 'inset(1% 1% 1% 1%)',
    width: '15.95cm',
    height: '16.55cm',
  }
}))(CompAnimation)
