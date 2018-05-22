import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { graphql } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col, Select } from 'antd';
import moment from 'moment';
import ModalV from './ModalV';
import ModalSelect from './ModalSelect';
import WebsiteDomainsQuery from 'data/queries/WebsiteDomainsQuery';
import WebsitePatternsQuery from 'data/queries/WebsitePatternsQuery';
import EnablePatternMutation from 'data/mutations/EnablePatternMutation';
import DisablePatternMutation from 'data/mutations/DisablePatternMutation';
import CreatePatternMutation from 'data/mutations/CreatePatternMutation';
import CreatePatternDomainAssocMutation from 'data/mutations/CreatePatternDomainAssocMutation';
import Secondary from 'components/buttons/Secondary';
import Primary from 'components/buttons/Primary';
import Toggle from 'components/toggle/Toggle';
import 'withStyles/general.css';

const Option = Select.Option;


const ShowDomain = compose(
  withState('showState', 'setShow', false),
  withHandlers({
    show: ({ setShow }) => () => setShow(_ => true),
    hide: ({ setShow }) => () => setShow(_ => false),
  }),
)(({ styles, showState, show, hide, pattern, showSelect }) => {
  if (showState) { 
    return (
      <span>
        {`${pattern.domains.length} Domains`} <span onClick={hide} {...css(styles.vertEllipse)}/>
        {pattern.domains.map((domain, i) => (
          <Row key={i} {...css(styles.doms)}>
            {domain.name}
          </Row>
        ))}
      </span>
    )
  } else {
     return pattern.domains && pattern.domains.length > 0 ? 
      <span>
        {`${pattern.domains.length} Domains`} <span onClick={show} {...css(styles.horEllipse)}/>
      </span> :
      <Secondary text="Select Domains" onClick={showSelect(pattern.id)}/>;
  }

});



const enhance = compose(
  withState('stateRowsPP', 'setStateRowsPP', 5),
  withState('stateCurrPage', 'setStateCurrPage', 0),
  withState('modalPat', 'setModalPat', false),
  withState('modalS', 'setModalS', false),
  withState('select', 'setSelect', { patternId: null, possibleDomains:[], domainsSelected: [] }),
  withHandlers({
    nextPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x+1),
    prevPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x-1),
    showModPat: ({ setModalPat }) => () => setModalPat(_ => true),
    hideModPat: ({ setModalPat }) => () => setModalPat(_ => false),
    showModS: ({ setModalS }) => () => setModalS(_ => true),
    hideModS: ({ setModalS }) => () => setModalS(_ => false),
  }),
  graphql(WebsiteDomainsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    }),
    name: 'data',
  }),
  graphql(WebsitePatternsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    }),
    name: 'patternsQuery',
  }),
  graphql(EnablePatternMutation, { name: 'enablePattern' }),
  graphql(DisablePatternMutation, { name: 'disablePattern' }),
  graphql(CreatePatternMutation, { name: 'createPattern' }),
  graphql(CreatePatternDomainAssocMutation, { name: 'associateDomains' }),
)
const Patterns = enhance(({ styles, data, patternsQuery, ...props }) => {
  if (data && data.loading)
    return <Spin size="large" /> 
  if (patternsQuery && patternsQuery.loading)
    return <Spin size="large" /> 


  const enablePattern = (id) => () => {
    props.enablePattern({
      variables: {id: id},
    })
  };
  const disablePattern = (id) => () => {
    props.disablePattern({
      variables: {id: id},
    })
  };
  const createPattern = (name) => () => {
     props.createPattern({
      variables: {
        input: {
          name,
          WebsiteId: props.websiteId
        }
      },
      update: (store, { data: { createPattern } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({
          query: WebsitePatternsQuery,
          variables: { websiteId: props.websiteId },
        });
        // Add our comment from the mutation to the end.
        data.websitePatterns.push(createPattern.pattern);
        // Write our data back to the cache.
        store.writeQuery({
          query: WebsitePatternsQuery, 
          variables: { websiteId: props.websiteId },
          data
        });
      },
    });
  };
  const showSelect = (patternId) => () => {
    const select = {
      patternId: patternId,
      possibleDomains: data.websiteDomains,
      domainsSelected: patternsQuery.websitePatterns.filter(x => x.id == patternId)[0].domains,
    };
    props.setSelect(select);
    props.showModS();
  };
  const associateDomains = (selected, unselected) => () => {
    const { patternId } = props.select;
    const input = {
      patternId,
      selected,
    };

    props.associateDomains({
      variables: {
        input,
      }
    });
  }

  const offset = props.stateCurrPage * props.stateRowsPP;
  let maxOffset = null;
  let body = [];
  if (patternsQuery && !patternsQuery.loading) {
  maxOffset = Math.min((props.stateCurrPage + 1) * props.stateRowsPP,
                    data.websiteDomains.length);
    body = patternsQuery.websitePatterns.map((pattern, i) => {
      const rowStyle = (i % 2) == 0 ? 'rowEven' : 'rowOdd'
      const lastPurge = pattern.lastpurge ? moment(pattern.lastpurge).format('MMM D, YYYY HH:mm ') :
        'Never';

      return (
        <tr key={i} {...css(styles[rowStyle])}>
          <td {...css(styles.colInter)}>
            <div {...css(styles.circle)} />
          </td>
          <td {...css(styles.colInter)}> {pattern.name} </td> 
          <td {...css(styles.colInter)}>  
            <Toggle
              on={pattern.enabled}
              onClick={
                pattern.enabled ? disablePattern(pattern.id) : 
                enablePattern(pattern.id)
              }
            />
          </td>
          <td {...css(styles.colInter)}><ShowDomain styles={styles} showSelect={showSelect} pattern={pattern}/></td>
          <td {...css(styles.colInter)}>  <span onClick={showSelect(pattern.id)} {...css(styles.change)}/> </td>
          <td {...css(styles.colInter)}>{lastPurge}</td>
          <td {...css(styles.colInter)}><Secondary text="PURGE NOW"/></td>
        </tr>
      )
    }).slice(offset, offset + props.stateRowsPP);
  }

  return (
    <div {...css(styles.container)}>
      <ModalV 
        title="New Pattern"
        placeholder="Pattern"
        visible={props.modalPat}
        onOk={createPattern}
        onCancel={() => props.hideModPat()}
      />
      <ModalSelect
        title="Select Domains"
        visible={props.modalS}
        possibleDomains={props.select.possibleDomains}
        domainsSelected={props.select.domainsSelected}
        onOk={associateDomains}
        onCancel={() => props.hideModS()}
      />
      <table {...(css(styles.table))}>
        <thead>
          <tr {...css(styles.head)}>
            <th {...(css(styles.colLeftTop))}>  </th>
            <th {...(css(styles.colMidTop))}> Pattern </th> 
            <th {...(css(styles.colMidTop))}> Enable </th>
            <th {...(css(styles.colMidTop))}> Domains </th>
            <th {...(css(styles.colMidTop))}>  </th>
            <th {...(css(styles.colMidTop))}> Last purge </th>
            <th {...(css(styles.colRightTop))}> Purge </th>
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
          <Primary text="ADD PATTERN" onClick={props.showModPat}/>
        </Col>
        <Col span={8} {...css(styles.colFooter)}>
          Rows per page: &nbsp;&nbsp;
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
  horEllipse: {
    width: '30px',
    height: '30px',
    marginLeft: '10px',
    marginBottom: '-10px',
    display: 'inline-block',
    backgroundImage: 'url("../../../imgs/icons/hor-ellipse.png")',
    ':hover': {
      backgroundImage: 'url("../../../imgs/icons/hover-ellipse.png")',
    },
  },
  vertEllipse: {
    width: '30px',
    height: '30px',
    marginLeft: '10px',
    marginBottom: '-10px',
    display: 'inline-block',
    backgroundImage: 'url("../../../imgs/icons/vert-ellipse.png")',
    ':hover': {
      opacity: '0.5',
    },
  },
  change: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    display: 'inline-block',
    backgroundImage: 'url("../../../imgs/icons/change.png")',
    ':hover': {
      opacity: '0.5',
    },
  },
}))(Patterns)