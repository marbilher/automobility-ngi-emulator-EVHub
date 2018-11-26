import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import DemoPage from './DemoPage'
import MapPage from './MapPage'
import styles from "./App.module.css";
import './App.css'



const BasicExample = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)} >
    <div>

    <div className='text-white top-padding'>
    <Link to="/" component={DemoPage}> Begin</Link>

    <Link to="/map" component={MapPage}> Map</Link>

      </div>
      <hr/>

      <Route exact path="/" component={DemoPage}/>
      <Route exact path="/map" component={MapPage}/>


    </div>
  </Router>
)
export default BasicExample