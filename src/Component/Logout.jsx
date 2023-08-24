import React, { Component, Fragment } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


export class Logout extends Component {
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex flex-column justify-content-center align-items-center'>
            </div>
        </Fragment>
    )
  }
}

export default Logout
