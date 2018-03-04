import React from 'react';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col, Select } from 'antd';
import WebsiteDomainsQuery from 'data/queries/WebsiteDomainsQuery';
import Secondary from 'components/buttons/Secondary';
import Primary from 'components/buttons/Primary';

const Option = Select.Option;

const enhance = compose(
  withState('stateRowsPP', 'setStateRowsPP', 5),
  withState('stateCurrPage', 'setStateCurrPage', 0),
  graphql(WebsiteDomainsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    })
  }),
)
const Domains = enhance(({ styles, data, ...props }) => {
  if (data && data.loading)
    return <Spin size="large" /> 

  const offset = props.stateCurrPage * props.stateRowsPP;
  let body = [];
  if (data && !data.loading) {
    body = data.websiteDomains.map((domain, i) => {
      const rowStyle = (i % 2) == 0 ? 'rowEven' : 'rowOdd'
      const verified = domain.verified ? 'yes' : <Secondary text="Verify Now"/>
      return (
        <tr key={i} {...css(styles[rowStyle])}>
          <td {...css(styles.colInter)}>Eve</td>
          <td {...css(styles.colInter)}> {domain.name} </td> 
          <td {...css(styles.colInter)}>94</td>
          <td {...css(styles.colInter)}>{verified}</td>
        </tr>
      )
    }).slice(offset, offset + props.stateRowsPP);
  }

  return (
    <div {...css(styles.container)}>
      <table {...(css(styles.table))}>
        <thead>
          <tr {...css(styles.head)}>
            <th {...(css(styles.colLeftTop))}> taz </th>
            <th {...(css(styles.colMidTop))}> Domain </th> 
            <th {...(css(styles.colMidTop))}> Enable </th>
            <th {...(css(styles.colRightTop))}> Verified </th>
          </tr>
        </thead>

        <tbody>
          {body}
        </tbody>
      </table>
      <Row {...css(styles.rowFooter)}>
        <Col span={8}>
          <Primary text="ADD DOMAIN"/>
        </Col>
        <Col span={8}>
          Rows per page: 
          <Select 
            labelInValue 
            defaultValue={{ key: props.stateRowsPP }} 
            onChange={value => props.setStateRowsPP(value.key)}
          >
            <Option value={5}> 5 </Option>
            <Option value={10}> 10 </Option>
            <Option value={20}> 20 </Option>
            <Option value={50}> 50 </Option>
          </Select>
        </Col>
        <Col span={8}>
        </Col>
      </Row>
    </div>
  )
})

export default  withStyles(({ color, unit }) => ({
  container: {
    backgroundColor: 'white',
  },
  table: {
    fontSize: '18px',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
  head: {
    backgroundColor: color.tabBlue
  },
  foot: {
    backgroundColor: 'white',
  },
  rowEven: {
    backgroundColor: 'white',
  },
  rowOdd: {
    backgroundColor: color.tableGrey,
  },
  colLeftTop: {
    height: '70px',
    color: 'white',
    borderRadius: '10px 0 0 0',
  },
  colMidTop: {
    color: 'white',
    height: '70px',
  },
  colRightTop: {
    color: 'white',
    height: '70px',
    borderRadius: '0 10px 0 0',
  },
  colLeftBot: {
    height: '70px',
    borderRadius: '0 0 0 10px',
  },
  colMidBot: {
    height: '70px',
  },
  colRightBot: {
    height: '70px',
    borderRadius: '0 0 10px 0',
  },
  colInter: {
    height: '70px',
  },
  rowFooter: {
    height: '70px',
  }
}))(Domains)