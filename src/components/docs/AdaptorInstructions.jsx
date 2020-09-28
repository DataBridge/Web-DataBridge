import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, List } from 'antd';

const enhance = compose(
);
const AdaptorInstructions = enhance(({ styles, visible, title, onOk, onCancel, ...props }) => {
  const handleClick = () => {
  };
  const data = [
    '1. Download the Vlynt Adaptor.',
    '2. Place it in the root directory of your server.',
    '3. Add <script type="text/javascript" src="./index.js"></script> at the top of the body of your index.html file.'
  ];
  return (
    <Modal
      size="large"
      onCancel={onCancel}
      title={title}
      visible={visible}
      footer={null}
    >
      <div {...css(styles.container)}>
        <List
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        <button type="button" {...css(styles.add)} onClick={handleClick}>
          DOWNLOAD
        </button>
      </div>
    </Modal>
  );
});

export default withStyles(({ color, unit }) => ({
  container: {
    position: 'relative'
  },
  add: {
    'margin-top': '20px',
    backgroundColor: color.darkPrimary,
    fontSize: ' 14px',
    color: 'white',
    borderRadius: '25px',
    border: 'none',
    height: '50px',
    width: '100px',
  }
}))(AdaptorInstructions)
