import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DatePicker } from 'antd';
import { css, withStyles } from 'withStyles';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import LogIn from './login/LogIn';
import Welcome from './Welcome';
import AdminPanel from './adminPanel';

localStorage.clear();

function App({ styles }) {

  const HomeLayout = () => (
    <div>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  )

const LoginLayout = () => (
  <div>
    <Header/>
    <LogIn/>
    <Footer/>
  </div>
);

const WelcomeLayout = () => (
  <div>
    <Header/>
    <Welcome/>
    <Footer/>
  </div>
);

const PanelLayout = () => (
  <div>
    <Header/>
    <AdminPanel/>
    <Footer/>
  </div>
);

  return (
    <div {...css(styles.theme)}>
      <Route exact path="/" component={HomeLayout}/>
      <Route path="/login" component={LoginLayout}/>
      <Route path="/welcome" component={WelcomeLayout}/>
      <Route path="/panel" component={PanelLayout}/>
    </div>);
}

export default  withStyles(({ color, unit }) => ({
    theme: {
      fontFamily: 'Quicksand',
      fontWeight: 'bold',
    },
  }))(App)
