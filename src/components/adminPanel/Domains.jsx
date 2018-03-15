import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col, Select } from 'antd';
import ModalV from './ModalV';
import WebsiteDomainsQuery from 'data/queries/WebsiteDomainsQuery';
import EnableDomainMutation from 'data/mutations/EnableDomainMutation';
import DisableDomainMutation from 'data/mutations/DisableDomainMutation';
import CreateDomainMutation from 'data/mutations/CreateDomainMutation';
import Secondary from 'components/buttons/Secondary';
import Primary from 'components/buttons/Primary';
import Toggle from 'components/toggle/Toggle';
import 'withStyles/general.css';

const Option = Select.Option;

const enhance = compose(
  withState('stateRowsPP', 'setStateRowsPP', 5),
  withState('stateCurrPage', 'setStateCurrPage', 0),
  withState('modalDom', 'setModalDom', false),
  withHandlers({
    nextPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x+1),
    prevPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x-1),
    showModDom: ({ setModalDom }) => () => setModalDom(_ => true),
    hideModDom: ({ setModalDom }) => () => setModalDom(_ => false),
  }),
  graphql(WebsiteDomainsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    })
  }),
  graphql(EnableDomainMutation, { name: 'enableDomain' }),
  graphql(DisableDomainMutation, { name: 'disableDomain' }),
  graphql(CreateDomainMutation, { name: 'createDomain' }),
)
const Domains = enhance(({ styles, data, ...props }) => {
  if (data && data.loading)
    return <Spin size="large" /> 

  const enableDomain = (id) => () => {
    props.enableDomain({
      variables: {id: id},
    })
  };
  const disableDomain = (id) => () => {
    props.disableDomain({
      variables: {id: id},
    })
  };
  const createDomain = (name) => () => {
     props.createDomain({
      variables: {
        input: {
          name,
          WebsiteId: props.websiteId
        }
      },
      update: (store, { data: { createDomain } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({
          query: WebsiteDomainsQuery,
          variables: { websiteId: props.websiteId },
        });
        // Add our comment from the mutation to the end.
        data.websiteDomains.push(createDomain.domain);
        // Write our data back to the cache.
        store.writeQuery({
          query: WebsiteDomainsQuery, 
          variables: { websiteId: props.websiteId },
          data
        });
      },
    });
  }

  const offset = props.stateCurrPage * props.stateRowsPP;
  let maxOffset = null;
  let body = [];
  if (data && !data.loading) {
  maxOffset = Math.min((props.stateCurrPage + 1) * props.stateRowsPP,
                    data.websiteDomains.length);
    body = data.websiteDomains.map((domain, i) => {
      const rowStyle = (i % 2) == 0 ? 'rowEven' : 'rowOdd'
      const verified = domain.verified ? 'yes' : <Secondary text="Verify Now"/>
      return (
        <tr key={i} {...css(styles[rowStyle])}>
          <td {...css(styles.colInter)}>
            <div {...css(styles.circle)} />
          </td>
          <td {...css(styles.colInter)}> {domain.name} </td> 
          <td {...css(styles.colInter)}>  
            <Toggle
              on={domain.enabled}
              onClick={
                domain.enabled ? disableDomain(domain.id) : 
                enableDomain(domain.id)
              }
            />
          </td>
          <td {...css(styles.colInter)}>{verified}</td>
        </tr>
      )
    }).slice(offset, offset + props.stateRowsPP);
  }

  return (
    <div {...css(styles.container)}>
      <ModalV 
        title="New Domain"
        placeholder="Domain"
        visible={props.modalDom}
        onOk={createDomain}
        onCancel={() => props.hideModDom()}
      />
      <table {...(css(styles.table))}>
        <thead>
          <tr {...css(styles.head)}>
            <th {...(css(styles.colLeftTop))}> taz </th>
            <th {...(css(styles.colMidTop))}> Domain </th> 
            <th {...(css(styles.colMidTop))}> Enable </th>
            <th {...(css(styles.colRightTop))}> Verified </th>
          </tr>
        </thead>

        <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={0}
              transitionLeaveTimeout={0}
              transitionAppearTimeout={0}
              transitionAppear={true}
              component="tbody"
            >
          {body}
          </ReactCSSTransitionGroup>
      </table>
      <Row {...css(styles.rowFooter)}>
        <Col span={8} {...css(styles.colFooter)}>
          <Primary text="ADD DOMAIN" onClick={props.showModDom}/>
        </Col>
        <Col span={8} {...css(styles.colFooter)}>
          Rows per page: 
          <Select 
            labelInValue 
            defaultValue={{ key: props.stateRowsPP }} 
            onChange={value => props.setStateRowsPP(value.key)}
            {...css(styles.pageSelect)}
          >
            <Option value={5}> 5 </Option>
            <Option value={10}> 10 </Option>
            <Option value={20}> 20 </Option>
            <Option value={50}> 50 </Option>
          </Select>
        </Col>
        <Col span={4} {...css(styles.colFooter)}>
          {data && !data.loading ? `${offset+1}-${maxOffset} of 
          ${data.websiteDomains.length}` : null}
        </Col>
        <Col span={4} {...css(styles.colFooter)}>
          <button onClick={props.prevPage} {...css(styles.pageButton)}> 
            {'<'} 
          </button>
          <button onClick={props.nextPage} {...css(styles.pageButton)}>
             {'>'}
          </button>
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
  },
  colFooter: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    margin: 'auto',
    border: '1px solid',
    borderColor: color.lightGrey,
    borderRadius: '24px',
    width: '24px',
    height: '24px',
    ':hover': {
      borderColor: color.darkPrimary,
    },
  },
  pageButton: {
    width: '30px',
    fontSize: '18px',
    fontWeight: '1000',
    backgroundColor: 'transparent',
    border: 'none',
    color: color.lightGrey ,
    ':hover': {
      color: color.darkPrimary,
    },
  },
}))(Domains)