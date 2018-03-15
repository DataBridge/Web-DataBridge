import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Modal } from 'antd';
import InputV from 'components/input/InputV';

const enhance = compose(
  withState('state', 'setState', 'empty'),
  withState('value', 'setValue', null),
  withHandlers({
    valid: ({ setState }) => () => setState(_ => 'valid'),
    invalid: ({ setState }) => () =>  setState(_ => 'invalid'),
    empty: ({ setState }) => () => setState(_ => 'empty'),
  }),
);
const ModalV = enhance(({ styles, visible, title, onOk, onCancel, ...props }) => {
  const handleClick = () => {
    onOk(props.value)();
    onCancel();
  }
  return (
    <Modal
      onCancel={onCancel}
      title={title}
      visible={visible}
      footer={null}
    >
      <div {...css(styles.container)}>
        <InputV 
          placeholder={props.placeholder}
          validate={_ => true}
          display="inline-block"
          state={props.state}
          valid={props.valid}
          invalid={props.invalid}
          empty={props.empty}
          setValue={props.setValue}
        />
        &nbsp; &nbsp;
        <button {...css(styles.add)} onClick={handleClick}>
          ADD
        </button>
      </div>
  </Modal>     
  )
});

export default  withStyles(({ color, unit }) => ({
  container: {
    position: 'relative'
  },
  add: {
    position: 'absolute',
    top: '20px',
    backgroundColor: color.darkPrimary,
    fontSize: ' 14px',
    color: 'white',
    borderRadius: '25px',
    border: 'none',
    height: '50px',
    width: '100px',
  }
}))(ModalV)