import React, { Component, Fragment } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import icndes from '../Assets/loginicon.png';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export class ForgotPass extends Component {
  constructor(props) {
    super(props);
    
  }
 
  
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex flex-column justify-content-center align-items-center'>
            <h3 className='loginstyleforg loganimtxt'>FORGOT PASS !!!</h3>
                <div className='row row-cols-1 row-cols-md-8 d-flex flex-column justify-content-center p-4 bodform'>

                    
                    <div className='col col-md-3 d-flex justify-content-center align-items-center mb-3 icondeslog mx-auto'> 
                        <img src={icndes} className='logimgsz' />
                    </div>
                
                    <div className='col col-md-12 d-flex justify-content-center mb-2'>
                    <input className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" />
                    </div>
                    
                    <div className='col col-md-12 d-flex justify-content-center'>
                    <button type="button" className="btn btn-sm btn-danger">Get New Pass</button>
                    </div>

                </div>
                <sub className='regclick mt-3'>Want To Login Now ? <Link className='linkhreflines' to="/login">CLICK HERE</Link></sub>
                <sub className='forgotclick mt-4'>Dont Have Any Id ? <Link className='linkhreflines' to="/registration">CLICK HERE</Link> </sub>
            </div>
        </Fragment>
    )
  }
}

export default ForgotPass
