import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import Lottie from 'react-lottie';

const enhance = compose(
  withState('stateHover', 'setStateHover', false),
  withHandlers({
    hover: ({ setStateHover }) => () => setStateHover(_ => true),
    unhover: ({ setStateHover }) => () =>  setStateHover(_ => false),
  }),
);
const Animation = enhance(({ styles, src, width, height, ...props }) => {
    const state = {isStopped: false, isPaused: false};

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: src,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    if (typeof src === "undefined") {
      src = "../../imgs/gen/globe.png";
    }

  return (
    <div>
      <Lottie options={defaultOptions}
        width={width}
        height={height}
        isStopped={state.isStopped}
        isPaused={state.isPaused}/>
    </div>
  )
});

export default  withStyles(({ color, unit, display }) => ({}))(Animation)
