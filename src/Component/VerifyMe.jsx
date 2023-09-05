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
  

export class VerifyMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            otp : '',
            returnMessage : '',
            open : false
        }
    }

    async componentDidMount(){
      window.$('[data-bs-toggle="tooltip"]').tooltip();
    }

    sendOtp = async(e)=>{
        const formData = new FormData();
        formData.append('email',this.state.email);
        formData.append('verifyCode',this.state.otp);

        try{

            const response = await axios.post('/sendOtp', formData, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    
            if(response.status == 200){
                if(response.data.message == 'Account Has Been Verified Successfully ...'){
                    document.getElementById('mail').value = '';
                    document.getElementById('otp').value = '';
    
                    setTimeout(()=>{window.location.href = '/login'},1800);
                }
                this.setState({
                    returnMessage : response.data.message,
                    open : true
                  })
            }
            
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
            <h3 className='loginstyle loganimtxt headfont'>Verify!!!</h3>
                <div className='row row-cols-1 row-cols-md-8 d-flex flex-column justify-content-center p-4 bodform bodfont'>

                    
                    <div className='col col-md-3 d-flex justify-content-center align-items-center mb-3 icondeslog mx-auto'> 
                        <img src={icndes} className='logimgsz' />
                    </div>
                
                    <div className='col col-md-12 d-flex justify-content-center mb-2'>
                    <input data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Provide registered email address where the otp was sent." id='mail' className="form-control form-control-sm" onChange={(e)=>{this.setState({email : e.target.value})}} type="text" placeholder="Email@" aria-label=".form-control-sm example" autoComplete='none'/>
                    </div>
                    <div className='col col-md-12 d-flex justify-content-center mb-3'>
                    <input data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Provide the otp that was sent to your mail." id='otp' className="form-control form-control-sm" onChange={(e)=>{this.setState({otp : e.target.value})}} type="text" placeholder="Verification Code" aria-label=".form-control-sm example" autoComplete='none'/>
                    </div>
                    <div className='col col-md-12 d-flex justify-content-center'>
                    <button onClick={(e)=>{this.sendOtp(e)}} type="button" className="btn btn-sm btn-danger">Verify</button>
                    </div>

                </div>
                <sub className='regclick mt-3 bodfont'>Don't Have Any Id Yet ? <Link className='linkhreflines' to="/registration">CLICK HERE</Link></sub>
                <sub className='regclick mt-3 bodfont'>Want To Log In ? <Link className='linkhreflines' to="/login">CLICK HERE</Link></sub>
                <sub className='forgotclick mt-4 bodfont'>Forgot Your Password ? <Link className='linkhreflines' to="/forgotpass">CLICK HERE</Link> </sub>
            
                <Snackbar
                  open={this.state.open}
                  autoHideDuration={4000}
                  onClose={this.handleClose} // Removed parentheses
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                <Alert onClose={this.handleClose} severity="success" sx={{
                  width: '100%',
                  backgroundColor: '#e80070', // Set your custom color here
                  color: 'white', // Set text color for visibility
                  fontFamily : 'Cormorant Infant'

                }}>
                  {this.state.returnMessage}
                </Alert>
               </Snackbar>

            </div>
        </Fragment>
    )
  }
}

export default VerifyMe
