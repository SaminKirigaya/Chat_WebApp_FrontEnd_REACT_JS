import React, { Component, Fragment } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import icndes from '../Assets/loginicon.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail : '',
      returnMessage : '',
      open : false,
    }
  }
 
  sendIt = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios({
        url : '/changePass',
        method : 'post',
        data : {
          email : this.state.mail
        }
      });

      if(res.data.message == ' A New Password Was Sent To You In This Mail Succesfully .... Login With That From Now.'){
        document.getElementById('mail').value = ''
        this.setState({
          mail : ''
        })
      }
      this.setState({
        returnMessage : res.data.message,
        open : true
      })
    }catch(err){
      console.log(err)
    }
    
  }


  handleClick = () => {
    this.setState({open : true})
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open : false})
    };


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
                    <input id='mail' className="form-control form-control-sm" onChange={(e)=>{this.setState({mail : e.target.value})}} type="text" placeholder="Email@" aria-label=".form-control-sm example" />
                    </div>
                    
                    <div className='col col-md-12 d-flex justify-content-center'>
                    <button type="button" onClick={(e)=>{this.sendIt(e)}} className="btn btn-sm btn-danger">Get New Pass</button>
                    </div>

                </div>
                <sub className='regclick mt-3'>Want To Login Now ? <Link className='linkhreflines' to="/login">CLICK HERE</Link></sub>
                <sub className='forgotclick mt-4'>Dont Have Any Id ? <Link className='linkhreflines' to="/registration">CLICK HERE</Link> </sub>
           
                <Snackbar
                  open={this.state.open}
                  autoHideDuration={4000}
                  onClose={this.handleClose} // Removed parentheses
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                <Alert onClose={this.handleClose} severity="success" sx={{
                  width: '100%',
                  backgroundColor: '#e80070', // Set your custom color here
                  color: 'white' // Set text color for visibility
                }}>
                  {this.state.returnMessage}
                </Alert>
               </Snackbar>

                </div>
        </Fragment>
    )
  }
}

export default ForgotPass
