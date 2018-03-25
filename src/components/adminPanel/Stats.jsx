import React from 'react';
import { css, withStyles } from 'withStyles';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';
import { Spin, Row, Col, DatePicker } from 'antd';
import { map, sortBy, sum, find, groupBy, values, flatten, mean } from 'lodash';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import { Line as LineChart } from 'react-chartjs-2';
import WebsiteDomainsQuery from 'data/queries/WebsiteDomainsQuery';
import WebsitePricingsQuery from 'data/queries/WebsitePricingsQuery';
import DomainsStatsQuery from 'data/queries/DomainsStatsQuery';
import 'withStyles/dropdownStyle.css';
import 'withStyles/datepicker.css';


function computeCost(chartData, pricingsData) {
  const sortedPricings = sortBy(pricingsData, x => {
    x.threshold
  });

  const chunks = groupBy(chartData, x => moment(x.time).format('YYYY-MM'))
  console.log(chunks)

  const processChunk = (chunk) => {
    let acc = 0;
    const dataTemp = chunk.map((v, i) => {
      const cum = acc + v.vlynt;
      acc += v.vlynt;
      return {
        ...v,
        cum, 
      }
    });

    return dataTemp.map(x => {
      let price = find(sortedPricings, y => (y.threshold >= x.cum));
      price = price ? price : sortedPricings[sortedPricings.length -1]
      return {
        ...x,
        price: price.price,
        threshold: price.threshold,
        cost: price.price * x.vlynt
      }
    });
  }

  return flatten(values(chunks).map(processChunk));

}


function ChartCard({ styles, data, options, left, right }) {
  return (
    <div>
    <Row {...css(styles.chartContainer)}>
      <LineChart 
        data={data}
        options={options}
        width={500}
        height={300}
        redraw={true}
      />
    </Row>
    <Row {...css(styles.infoContainer)}>
      <Col span={11} {...css(styles.info)}>
        <p {...css(styles.infoTitle)}>
          {left.title}
        </p>
        <p {...css(styles.infoBody)}>
          {left.body}
        </p>
      </Col>
      <Col span={2}>
      </Col>
      <Col span={11} {...css(styles.info)}>
        <p {...css(styles.infoTitle)}>
          {right.title}
        </p>
        <p {...css(styles.infoBody)}>
          {right.body}
        </p>
      </Col>
    </Row>
    </div>
  )
}

const enhance = compose(
  withState('domainsIds', 'setDomainsIds', []),
  withState('from', 'setFrom', moment.now()),
  withState('fromStart', 'setFromStart', moment.now()),
  withState('to', 'setTo', moment.now()),
  withState('domainSelect', 'setDomainSelect', null),
  withHandlers({
    nextPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x+1),
  }),
  graphql(WebsiteDomainsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    }),
    name: 'domainsQuery',
  }),
  graphql(WebsitePricingsQuery, {
    options: ({  websiteId }) => ({
      variables: { id: websiteId },
      skip: !websiteId,
    }),
    name: 'pricingsQuery',
  }),
  graphql(DomainsStatsQuery, {
    options: ({ domainsIds, fromStart, to }) => ({
      variables: { 
        ids: domainsIds,
        from: moment(fromStart).format('YYY-MM-DD'),
        to: moment(to).format()
      },
      skip: !domainsIds || !fromStart || !to,
    }),
    name: 'statsQuery',
  }),
)
const Stats = enhance(({ styles, domainsQuery, statsQuery,
  pricingsQuery, ...props }) => {
  if (!props.websiteId)
    return (null)
  if (domainsQuery && domainsQuery.loading)
    return <Spin size="large" /> 
  if (pricingsQuery && pricingsQuery.loading)
    return <Spin size="large" /> 

  const domainsIds = domainsQuery.websiteDomains.map(x => (x.id));
  if (domainsIds.toString() !== props.domainsIds.toString())
    props.setDomainsIds(domainsIds);

  const options = domainsQuery.websiteDomains.map(w => ({
    value: w.id,
    label: w.name,
  }));
  const selectedOption = props.domainSelect ? options.filter(x => {
    return x.value == props.domainSelect
  })[0] : { value: 'Domains', label: 'Domains'};

  const handleFrom = (m, dateString) => {
    const mm = m.clone().startOf('month');
    props.setFrom(dateString)
    props.setFromStart(mm)
  }
  const handleTo = (_, dateString) => {
    props.setTo(dateString)
  }

  const header = (
    <Row {...css(styles.headerRow)}>
      <Col span={12} {...css(styles.dates)}>
        <DatePicker 
          onChange={handleFrom} 
          defaultValue={moment(props.from)}
          format={'MMM D, YYYY'}
        />
        {' '} -- {' '}
        <DatePicker
          onChange={handleTo}
          defaultValue={moment(props.to)}
          format={'MMM D, YYYY'}
        />
      </Col>
      <Col span={4}>
      </Col>
      <Col span={2}>
        Domains: 
      </Col>
      <Col span={6} {...css(styles.colDropdown)}>
        <Dropdown 
          options={options} 
          value={selectedOption}
          placeholder={'Select'}
          onChange={({ value }) => props.setDomainSelect(value)}
        />
      </Col>
    </Row>
  )

  if (!statsQuery)
    return header;

  if (statsQuery && statsQuery.loading)
    return <Spin size="large" /> 

  const chartData = sortBy(statsQuery.domainsStats, x => {
    return new Date(x.time);
  }).filter(x => {
     return x.DomainId == props.domainSelect;
  });

  const statsVlynt = map(chartData, 'vlynt');
  const statsFallBack = map(chartData, 'fallback');
  const totalVlynt = sum(statsVlynt);
  const totalFallback = sum(statsFallBack);
  const percent = (totalVlynt / (totalVlynt + totalFallback)) * 100;
  const labels = map(chartData, 'time').map(x => {
    return moment(x).format('MMM D')
  })
  const times = map(chartData, 'time');

  const costData = computeCost(chartData, pricingsQuery.websitePricings);
  const cost = map(costData, 'cost');
  const threshold = map(costData, 'threshold');

  const totalCost = sum(cost);
  const meanCost = Math.round(mean(cost)*100) / 100;

  const charOpts = {
    title: {
      display: true,
      text: 'Data Transfer (GBs)',
      fontFamily: 'Quicksand',
      fontColor: 'black',
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }   
      }]
    },
    legend: {
      labels : {
        usePointStyle: true
      }
    },
    tooltips: {
      mode : 'index',
      titleFontFamily: 'Quicksand',
      titleFontColor: 'black',
      titleFontSize: 14,
      bodyFontSize: 12,
      bodyFontFamily: 'Quicksand',
      bodyFontColor: 'grey',
      backgroundColor: 'white',
      titleMarginBottom: 20,
      bodySpacing: 15,
      xPadding: 20,
      yPadding: 20,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      callbacks: {
        title: function(tooltipItem, data) {
          const i = tooltipItem[0].index
          const m = moment(times[i]).format('ddd, MMM D YYYY, h:mm')
          return m
        },
      }
    }
  };

  const dataConso = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,0,150);
    gradient.addColorStop(0, 'rgba(0, 199, 239, 0.5)');   
    gradient.addColorStop(1, 'rgba(0, 199, 239, 0.05)');
    return {
    labels,
    datasets: [
      {
        label: 'GBs through vlynt',
        fill: true,
        lineTension: 0.5,
        backgroundColor: gradient,
        borderWidth: 2,
        borderColor: '#00c7ef',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#00c7ef',
        pointBackgroundColor: '#00c7ef',
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#00c7ef',
        pointHoverBorderColor: '#00c7ef',
        pointHoverBorderWidth: 0,
        pointRadius: 2,
        pointHitRadius: 5,
        data: statsVlynt,
      },
      {
        label: 'GBs through fallback',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 2,
        borderColor: '#b0dfe7',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#b0dfe7',
        pointBackgroundColor: '#b0dfe7',
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#b0dfe7',
        pointHoverBorderColor: '#b0dfe7',
        pointHoverBorderWidth: 0,
        pointRadius: 2,
        pointHitRadius: 5,
        data: statsFallBack,
      }
    ]
  }};


  const dataCost = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,0,150);
    gradient.addColorStop(0, 'rgba(0, 199, 239, 0.5)');   
    gradient.addColorStop(1, 'rgba(0, 199, 239, 0.05)');
    return {
      labels,
      datasets: [
        {
          label: 'Cost',
          fill: true,
          lineTension: 0.5,
          backgroundColor: gradient,
          borderWidth: 2,
          borderColor: '#00c7ef',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#00c7ef',
          pointBackgroundColor: '#00c7ef',
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#00c7ef',
          pointHoverBorderColor: '#00c7ef',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 5,
          data: cost,
        },
/*       {
        label: 'Threshold',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 2,
        borderColor: '#b0dfe7',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#b0dfe7',
        pointBackgroundColor: '#b0dfe7',
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#b0dfe7',
        pointHoverBorderColor: '#b0dfe7',
        pointHoverBorderWidth: 0,
        pointRadius: 2,
        pointHitRadius: 5,
        data: threshold,
      } */
    ]
  }};



  return (
    <div {...css(styles.container)}>
      {header}
      {props.websiteId} -- {props.domainSelect}
      <Row>
        <Col lg={11} md={24} {...css(styles.cardContainer)}>
          <ChartCard 
            styles={styles}
            data={dataConso}
            options={charOpts}
            left={{
              title: 'TOTAL GBs THROUGH FALLBACK',
              body: `${totalFallback} GB`
            }}
            right={{
              title: 'TOTAL GBs THROUGH VLYNT',
              body: (<span> {`${totalVlynt} GB`} <span {...css(styles.percent)}>
                {`(${percent.toFixed(2)}%)`}</span> </span>)
            }}
          />
        </Col>
        <Col lg={2} md={0}/>
        <Col lg={11} md={24} {...css(styles.cardContainer)}>
          <ChartCard 
            styles={styles}
            data={dataCost}
            options={charOpts}
            left={{
              title: 'TOTAL COST',
              body: `$ ${totalCost}`
            }}
            right={{
              title: 'AVRAGE RATE',
              body: (<span> {`$ ${meanCost}`} <span {...css(styles.gb)}>
                 / GB</span></span>)
            }}
          />
        </Col>
      </Row>
    </div>
  )
});

export default  withStyles(({ color, unit }) => ({
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
  },
  cardContainer: {
    textAlign: 'center',
  },
  infoContainer:{
    marginTop: '30px',
    marginBottom: '30px',
  },
  info: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
  },
  infoTitle: {
    color: color.lightGrey,
    fontSize: '12px'
  },
  infoBody: {
    color: 'black',
    fontSize: '18px'
  },
  dates: {
    textAlign: 'left',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
  },
  gb: {
    color: color.lightGrey,
    fontSize: '14px'
  },
  percent: {
    color: '#4fe3c3',
    fontSize: '14px'
  },
}))(Stats)