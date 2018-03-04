import React from 'react';
import { withApollo } from 'react-apollo';
import { css, withStyles } from 'withStyles';
import { withState } from 'recompose';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const enhance = withState('tabIndex', 'setTabIndex', 0);
const TabsBuilder = enhance(({ styles, titles, comps, tabIndex, 
  setTabIndex }) => {
  const tabs = titles.map((t, i) => {
    if (i == tabIndex) {
      return <Tab key={i} {...css(styles.tabActive)}> {t} </Tab>
    }
    return <Tab key={i} {...css(styles.tab)}> {t} </Tab>
  })
  const tabPanels = comps.map((c, i) => {
    return ( 
      <TabPanel key={i}>
        {c}
      </TabPanel>
    )
  });
  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={tabIndex => setTabIndex(_ => tabIndex)}
      {...css(styles.tabs)}
    >
      <TabList {...css(styles.tabList)}>
        {tabs}
      </TabList>

      {tabPanels}
    </Tabs>
  )
});

const tabStyle = {
  listStyleType: 'none',
  textAlign: 'center',
  flex: '1 1 100%',
  fontSize: '16px',
  paddingBottom: '10px',
}

export default  withStyles(({ color, unit }) => ({
  tabs: {
    visibility: 'visible',
  },
  tabList: {
    display: 'flex',
    width: '100%',
    padding: '0px',
    cursor: 'pointer',
  },
  tab: {
    color: color.lightGrey,
    ...tabStyle,
  },
  tabActive: {
    color: color.tabBlue,
    borderBottom: '3px solid',
    borderColor: color.tabBlue,
    ...tabStyle,
  }
}))(TabsBuilder)