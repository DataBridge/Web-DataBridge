import React from 'react';
import { css, withStyles } from 'withStyles';
import SimpleModal from '../popups/simpleModal';

const ConfirmModal = ({ styles, question, yesText, noText, onYes, onNo, toggleVisible }) => {
  const a = 0
  return (
    <div>
    <SimpleModal
      styles={styles}
      toggleVisible={toggleVisible}
      text={(
        <div>
          <span>
            {question}<br/>
            <hr/>
          </span>
          <div {... css(styles.buttonContainer)}>
            <button
            type="button"
            onClick={onYes}
            {... css(styles.button)}
            >
            {yesText}
            </button>
          </div>
        </div>
      )}
    />
    </div>
  )
};

export default  withStyles(({ color, unit }) => ({
  buttonContainer: {
    height: '40px'
  },
  button: {
    textAlign: 'center',
    borderRadius: '17px',
    width: '120px',
    height: '34px',
    border: '1px solid',
    display: 'inline-block',
    ':focus': {outline:'0'},
    ':hover': {cursor: 'pointer'}
  },
}))(ConfirmModal)
