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
  

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnMessage : '',
      open : false,
      email : '',
      pass : ''
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


    loginNow= async(e)=>{
      const formData = new FormData();
      formData.append('email', this.state.email);
      formData.append('password', this.state.pass);

      try{
        const response = await axios.post('/login', formData, {
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        if(response.status == 200){
          if(response.data.message == 'Successfully Logged In ...'){
            document.getElementById('mail').value = '';
            document.getElementById('pass').value = '';

            localStorage.setItem('slno',response.data.usersl);
            localStorage.setItem('image',response.data.image);
            localStorage.setItem('token',response.data.token);
            
            setTimeout(()=>{window.location.href = '/allFriends'},1800);
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
  
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex flex-column justify-content-center align-items-center'>
            <h3 className='loginstyle loganimtxt'>LOGIN !!!</h3>
                <div className='row row-cols-1 row-cols-md-8 d-flex flex-column justify-content-center p-4 bodform'>

                    
                    <div className='col col-md-3 d-flex justify-content-center align-items-center mb-3 icondeslog mx-auto'> 
                        <img src={icndes} className='logimgsz' />
                    </div>
                
                    <div className='col col-md-12 d-flex justify-content-center mb-2'>
                    <input id='mail' onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" />
                    </div>
                    <div className='col col-md-12 d-flex justify-content-center mb-3'>
                    <input id='pass' onChange={(e)=>{this.setState({pass : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" />
                    </div>
                    <div className='col col-md-12 d-flex justify-content-center'>
                    <button onClick={(e)=>{this.loginNow(e)}} type="button" className="btn btn-sm btn-danger">Login</button>
                    </div>

                </div>
                <sub className='regclick mt-3'>Don't Have Any Id Yet ? <Link className='linkhreflines' to="/registration">CLICK HERE</Link></sub>
                <sub className='forgotclick mt-4'>Forgot Your Password ? <Link className='linkhreflines' to="/forgotpass">CLICK HERE</Link> </sub>


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


export default Login
