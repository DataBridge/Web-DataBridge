import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, Checkbox, Row, Col } from 'antd';
import InputV from 'components/input/InputV';


const enhance = compose(
  withState('value', 'setValue', null),
);
const ModalSelect = enhance(({ styles, visible, title, onOk, onCancel, ...props }) => {
  const handleClick = () => {
    if (props.value) {
      onOk(props.possibleDomains.filter(x => props.value.includes(x.name)).map(x => x.id))();
      onCancel();
    } else {
      onCancel();
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      title={title}
      visible={visible}
      footer={null}
    >
      <div {...css(styles.container)}>
        <Checkbox.Group style={{ width: '100%' }} onChange={props.setValue} value={props.value ? props.value :  props.domainsSelected.map(x => x.name)}> 
          {props.possibleDomains.map((domain, i) => (
            <Row key={i}>
              <Checkbox value={domain.name}>{domain.name}</Checkbox>
            </Row>
          ))}
        </Checkbox.Group>,
        &nbsp; &nbsp;
        <Row>
          <button {...css(styles.add)} onClick={handleClick}>
            Select
          </button>
        </Row>
      </div>
  </Modal>     
  )
});

export default  withStyles(({ color, unit }) => ({
  container: {
    position: 'relative'
  },
  add: {
    backgroundColor: color.darkPrimary,
    fontSize: ' 14px',
    color: 'white',
    borderRadius: '25px',
    border: 'none',
    height: '50px',
    width: '100px',
  }
}))(ModalSelect)