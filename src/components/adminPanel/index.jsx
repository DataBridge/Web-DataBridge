import React from 'react';
import { css, withStyles } from 'withStyles';
import { compose, withState, withHandlers } from 'recompose';
import Tabs from 'components/tabs/Tabs';
import WebsiteZone from './WebsiteZone';
import Domains from './Domains';
import Stats from './Stats';
import Patterns from './Patterns';
import VlyntMap from './Map';

const enhance = compose(
  withState('stateWebsite', 'setStateWebsite', null),
  withHandlers({
    validEmail: ({ setStateEmail }) => () => setStateEmail(_ => 'valid'),
  }),
);
const AdminPanel = enhance(({ styles, ...props }) => {
  return (
    <div {...css(styles.container)}>
      <div {...css(styles.head)}>
        Your Admin Panel
      </div>

      <div {...css(styles.website)}>
        <WebsiteZone
          setValue={props.setStateWebsite}
          webSelect={props.stateWebsite}
        />
      </div>

      <div {...css(styles.tabsBack)}>
        {
          props.stateWebsite ? (
            <div {...css(styles.tabsContainer)}>
              <Tabs
                titles={['DOMAINS', 'PATTERNS', 'STATISTICS', 'MAP']}
                defaultIdx={0}
                comps={[
                  <Domains websiteId={props.stateWebsite} />,
                  <Patterns websiteId={props.stateWebsite} />,
                  <Stats websiteId={props.stateWebsite} />,
                  <VlyntMap websiteId={props.stateWebsite} />,
                ]}
              />
            </div>

          ) : <div/>
        }
      </div>
    </div>
  )
});

export default withStyles(({ color, unit }) => ({
  container: {
  },
  website: {
    width: '100%',
    height: '110px',
    paddingTop: '30px',
    textAlign: 'center',
    display: 'inline-block'
  },
  tabsBack: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    textAlign: 'center',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
  tabsContainer: {
    width: '100%',
    maxWidth: '1500px',
    textAlign: 'center',
    display: 'inline-block'
  },
  head: {
    fontSize: '36px',
    color: 'white',
    textAlign: 'center',
    backgroundImage: color.gradientLeft,
  },
}))(AdminPanel)
