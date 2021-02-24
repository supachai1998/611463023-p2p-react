import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {detect } from 'detect-browser'
import {Alert} from '@material-ui/lab/';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const browser = detect();
console.table(browser)

const app = () => <App  />
ReactDOM.render(
  
  <React.StrictMode>
  <Router >
      <Switch>
      {browser.name === 'edge-chromium' ? <Alert severity="error"  style={{textAlign:'center'}}>ใช้ไม่ได้นะ ให้ไปใช้ firefox หรือ chrome แทน </Alert> :<Route path="/" exact component={app} /> }
      </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
