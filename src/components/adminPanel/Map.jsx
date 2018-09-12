import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import moment from 'moment';
import { css, withStyles } from 'withStyles';
import Dropdown from 'react-dropdown';
import { Spin, Row, Col, DatePicker } from 'antd';
import { cloneDeep, groupBy, sumBy, max, min, sortBy, reverse } from 'lodash';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'
import { compose, withState, withHandlers } from 'recompose';
import mapGeo from './world-50m.json';
import WebsiteDomainsQuery from 'data/queries/WebsiteDomainsQuery';
import DomainsStatsQuery from 'data/queries/DomainsStatsQuery';
import 'withStyles/dropdownStyle.css';
import 'withStyles/datepicker.css';
import regions from './regions.json';

const colorBetween = require('color-between');
const topoSimplify = require('topojson-simplify');


let simpleGeo = topoSimplify.presimplify(mapGeo);
const thresh = topoSimplify.quantile(simpleGeo, 0.05)
simpleGeo = topoSimplify.simplify(simpleGeo, thresh);

console.log(simpleGeo, '--------')


const wrapperStyles = {
  width: "100%",
  maxWidth: '100%',
  margin: "0 auto",
}

const enhance = compose(
  withState('zoom', 'setZoom', 1),
  withHandlers({
    upZoom: ({ setZoom }) => () => setZoom(z => z + 0.5),
    downZoom: ({ setZoom }) => () => setZoom(z => z - 0.5),
  }),
  withState('domainsIds', 'setDomainsIds', []),
  withState('from', 'setFrom', moment().add(-2, 'days').format('YYYY-MM-DD')),
  withState('fromStart', 'setFromStart', moment().add(-2, 'days').format('YYYY-MM-DD')),
  withState('to', 'setTo', moment().format('YYYY-MM-DD')),
  withState('domainSelect', 'setDomainSelect', null),
  withState('region', 'setRegion', null),
  withState('device', 'setCategory', null),
  withHandlers({
    nextPage: ({ setStateCurrPage }) => () => setStateCurrPage(x => x + 1),
  }),
  graphql(WebsiteDomainsQuery, {
    options: ({ websiteId }) => ({
      variables: { websiteId },
      skip: !websiteId,
    }),
    name: 'domainsQuery',
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
);


const VlyntMap = enhance(({ styles, zoom, domainsQuery, statsQuery, ...props }) => {
  if (!props.websiteId)
    return (null)
  if (domainsQuery && domainsQuery.loading)
    return <Spin size="large" />

  const domainsIds = domainsQuery.websiteDomains.map(x => (x.id));
  if (domainsIds.toString() !== props.domainsIds.toString())
    props.setDomainsIds(domainsIds);

  if (domainsQuery.websiteDomains.length === 0) {
    return null
  }

  const options = domainsQuery.websiteDomains.map(w => ({
    value: w.id,
    label: w.name,
  }));
  const selectedOption = props.domainSelect ? options.filter(x => {
    return x.value == props.domainSelect
  })[0] : { value: 'Domains', label: 'Domains' };

  if (!props.domainSelect)
    props.setDomainSelect(options[0].value)

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
  );

  if (!statsQuery) return header;

  if (statsQuery && statsQuery.loading) return <Spin size="large" />;

  // Modify data for display
  const convertedDomainStats = statsQuery.domainsStats.map((stat) => {
    const convertedStat = cloneDeep(stat);
    // Convert domain stats to GB
    convertedStat.fallback = stat.fallback * 1e-9;
    convertedStat.vlynt = stat.vlynt * 1e-9;
    return convertedStat;
  });

  const stats = convertedDomainStats.filter(x => {
    return moment(x.time).isSameOrAfter(props.from) && x.DomainId === props.domainSelect;
  })
  const byRegion = groupBy(stats, x => x.region)
  const markers = [];
  let sizes = [];
  let totalCat = 0;
  // for (var region in byRegion)
  Object.keys(byRegion).map((region) => {
    const sumByRegion = Math.ceil(sumBy(byRegion[region], 'vlynt'));

    const byDevice = groupBy(byRegion[region], y => y.device);
    let cats = []
    // for (var cat_key in byDevice)
    Object.keys(byDevice).forEach((cat_key) =>  {
      const sumByDevice = Math.ceil(sumBy(byDevice[cat_key], 'vlynt'));
      totalCat += sumByDevice;

      // Capitalize devices
      const device = (cat_key === 'television') ? 'SmartTV' : cat_key.charAt(0).toUpperCase() + cat_key.slice(1);

      cats.push({
        device,
        val: sumByDevice
      });
    });
    cats = sortBy(cats, 'val');

    sizes.push(sumByRegion);

    if (regions[region] == null) {
      region = 'unkown';
    }

    const res = {
      markerOffset: 0,
      name: region,
      value: Math.ceil(sumByRegion),
      coordinates: [regions[region].long, regions[region].lat],
      categories: cats,
      totalCat: Math.ceil(totalCat),
    };
    totalCat = 0;
    markers.push(res);
  });
  const maxSize = max(sizes);
  const minSize = (max(sizes) === min(sizes)) ? 0 : min(sizes);


  const projectionConfig = {
    scale: 250,
    rotation: [-11, 0, 0],
  };
  return (
    <div style={wrapperStyles}>
      {header}
      <ComposableMap
        projectionConfig={projectionConfig}
        width={1000}
        height={600}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup center={[0, 20]} disablePanning zoom={zoom}>
          <Geographies geography={simpleGeo}>
            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
              <Geography
                key={i}
                geography={geography}
                projection={projection}
                style={{
                  default: {
                    fill: "#ECEFF1",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    fill: "#607D8B",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#FF5722",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                }}
              />
            ))}
          </Geographies>
          <Markers>
            {markers.map((marker, i) => {
              const ratio = (marker.value - minSize) / (maxSize - minSize);
              const color = colorBetween('#4fe3c3', '#4b6ee5', ratio, 'hex')
              let offsetCum = 0;
              console.log('-----', marker)

              return (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: {
                      border: 0,
                      outlineStyle: 'none',
                    },
                    hover: {
                      boder: 0,
                      outlineStyle: 'none',
                    },
                    pressed: {
                      border: 0,
                      outlineStyle: 'none',
                    },
                  }}
                  onClick={_ => props.setRegion(props.region === marker.name ? null : marker.name)}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={10 + ratio * 20}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="4"
                  />
                  <circle
                    fill="url(#MyGradient)"
                    cx={50}
                    cy={50}
                    r={10 + ratio * 20}
                  />


                  {props.region === marker.name ? (
                    <g
                      transform={`scale(0.5) translate(${(marker.name === 'oceania') ? -325 : 25}, 25)`}
                      stroke="grey"
                      strokeOpacity="0.2"
                      strokewidth="1"
                    >
                      <rect x="-20" y="-20" width="350" height="150"
                        fill="white" ry="15" ry="15" />
                      {marker.categories.map(({ device, val }, i) => {
                        const offset = Math.round(((val / marker.totalCat) * 100));
                        offsetCum += offset;
                        const spacing = (1 / (marker.categories.length + 1)) * 150;
                        const cc = colorBetween('#4fe3c3', '#4b6ee5', offsetCum / 100, 'hex')
                        return (
                          <g>
                            <circle cx="130" cy={130 - spacing * (i + 1)} r={2 + (offsetCum / 100) * 5} fill={cc} />
                            <text x="150" y={130 - spacing * (i + 1) + 5}
                              style={{
                                fontFamily: "Roboto, sans-serif",
                                fontSize: '16px',
                                fill: props.device === device ? cc : "#000000",
                              }}>
                              {`${device}`}
                            </text>
                            <text x="220" y={130 - spacing * (i + 1) + 5}
                              style={{
                                fontFamily: "Roboto, sans-serif",
                                fontSize: '16px',
                                fill: props.device === device ? cc : "#000000",
                              }}>
                              {`${offset}% (${val} GB)`}
                            </text>
                          </g>
                        )
                      })}
                      {offsetCum = 0}
                      <circle cx="50" cy="50" width="100" r="54" fill="grey" opacity="0.5" />
                      <circle cx="50" cy="50" width="100" r="52" fill="white" />
                      {reverse(marker.categories.map(({ device, val }, i) => {
                        const offset = Math.round(((val / marker.totalCat) * 100));
                        offsetCum += offset;
                        const cc = colorBetween('#4fe3c3', '#4b6ee5', offsetCum / 100, 'hex')
                        const dec = i === (marker.categories.length - 1) ? 30 : 20;
                        return (
                          <g transform="rotate(180 50 50)">
                            < mask id="myMask" >
                              <rect x="0" y="0" width="100" height="100"
                                fill="black" />
                              <circle cx="50" cy="50" width="100" r="50" fill="white" />
                            </mask>
                            <g
                              onMouseLeave={_ => props.setCategory(null)}
                              onMouseOver={_ => props.setCategory(device)}
                            >
                              <rect x="0" y="0" width="100" height={(offsetCum / 100) * 100}
                                fill={cc} mask="url(#myMask)" />
                              {props.device === device && offset > 20 ? (
                                <g transform="rotate(180 50 50)">
                                  <text x="25" y={100 - (offsetCum / 100) * 100 + dec}
                                    style={{
                                      fontFamily: "Roboto, sans-serif",
                                      fontSize: '16px',
                                      fill: '#FFFFFF'
                                    }}>
                                    {`${val} GB`}
                                  </text>
                                </g>
                              ) : null}
                            </g>
                          </g>
                        )
                      })
                      )}
                    </g>
                  ) : null}

                  <text
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: `${6 + ratio * 10}px`,
                      fill: "#FFFFFF",
                    }}
                  >
                    {marker.value}
                  </text>
                </Marker>
              )
            })}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
      {
      // <button onClick={props.upZoom}>
      //   +
      // </button>
      // <button onClick={props.downZoom}>
      //   -
      // </button>
      }
    </div>
  );
});

export default withStyles(({ color, unit }) => ({
  dates: {
    textAlign: 'left',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
}))(VlyntMap)
