import React from 'react';
import { css, withStyles } from 'withStyles';
import Animation from './Animation';
import * as earthAnimationData from '../../../imgs/animations/earth_loop.json';

const EarthAnimation = ({ width, height, styles }) => {
  const alt = '../../imgs/gen/globe.png';
  return (
    <Animation src={earthAnimationData} width={width} height={height} {...css(styles)}/>
  )
}

export default withStyles(({ color, unit }) => ({}))(EarthAnimation)
