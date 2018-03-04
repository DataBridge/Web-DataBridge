import React from 'react';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col } from 'antd';
import Dropdown from 'react-dropdown'
import Primary from 'components/buttons/Primary';
import MyWebsitesQuery from 'data/queries/MyWebsitesQuery';
import 'withStyles/dropdownStyle.css';

const enhance = compose(
  graphql(MyWebsitesQuery, {
    options: () => ({
      skip: !localStorage.getItem('token'),
    })
  }),
);
const WebsiteZone = enhance(({ styles, data, setValue}) => {
  if (data.loading)
    return <Spin size="large" /> 

  const options = data.myWebsites.map(w => ({
    value: w.id,
    label: w.name,
  }));

  return (
    <Row {...css(styles.container)}>
      <Col span={2} {...css(styles.text)}>
        Website: 
      </Col>
      <Col span={15}>
        <Dropdown 
          options={options} 
          value={"Select a website"} placeholder="Select an option"
          onChange={({ value }) => setValue(value)}
        />
      </Col>
      <Col span={5}>
        <Primary text="ADD NEW"/>
      </Col>
      <Col span={2}>
        fa
      </Col>
    </Row>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
    width: '100%',
    maxWidth: '1170px',
    display: 'inline-block'
  },
  text: {
    paddingTop: '18px',
    fontSIze: '18px',
  },
  select: {
    borderRadius: '20px',
  },
  option: {
    borderRadius: '20px',
  }
}))(WebsiteZone)