import React from 'react';
import { DatePicker } from 'antd';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
        <DatePicker/>
      </div>);
  }
}