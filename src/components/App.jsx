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
import Faq from './docs/FAQ'
import Terms from './docs/TermsAndConditions'

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

const FaqLayout = () => (
  <div>
    <Header/>
    <Faq/>
    <Footer/>
  </div>
);

const TermsLayout = () => (
  <div>
    <Header/>
    <Terms/>
    <Footer/>
  </div>
);

  return (
    <div {...css(styles.theme)}>
      <Route exact path="/" component={HomeLayout}/>
      <Route path="/login" component={LoginLayout}/>
      <Route path="/welcome" component={WelcomeLayout}/>
      <Route path="/panel" component={PanelLayout}/>
      <Route path="/faq" component={FaqLayout}/>
      <Route path="/terms" component={TermsLayout}/>
    </div>);
}

export default  withStyles(({ color, unit }) => ({
    theme: {
      fontFamily: 'Quicksand',
      fontWeight: 'bold',
    },
  }))(App)
