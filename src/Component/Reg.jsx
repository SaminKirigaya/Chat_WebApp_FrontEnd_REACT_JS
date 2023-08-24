import React, { Component, Fragment } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import icndes from '../Assets/loginicon.png';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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


export class Reg extends Component {
  constructor(props) {
    super(props);
    this.state={
      username : '',
      fullname : '',
      email : '',
      country : '',
      birth: null,
      age : null,
      gender : '',
      password : '',
      confirmPassword : '',
      open: false,
      returnMessage : ''
    }
  }

  
  

  registerUser=async(e)=>{
    

    const formData = new FormData();
    formData.append('username',this.state.username);
    formData.append('fullname',this.state.fullname);
    formData.append('email',this.state.email);
    formData.append('country',this.state.country);
    formData.append('dateofBirth',this.state.birth);
    formData.append('age',this.state.age);
    formData.append('gender',this.state.gender);
    formData.append('password',this.state.password);
    formData.append('confirm_password',this.state.confirmPassword);

    try{
      const response = await axios.post('/registration', formData, {
          headers : {
          'Content-Type' : 'application/json'
        }
      });
      
        if(response.status == 200){
          if(response.data.message == 'You Are Sent A Verifying Code in Your Mail ... Verify In Email Verify Page.'){
            document.getElementById('uname').value = '';
            document.getElementById('fname').value = '';
            document.getElementById('email').value = '';
            document.getElementById('country').value = '';
            document.getElementById('birth').value = '';
            document.getElementById('age').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('cpass').value = '';

            setTimeout(()=>{window.location.href = '/verifyMe'},3000);
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
            <h3 className='loginstylereg loganimtxt'>REGISTRATION !!!</h3>
                <div className='row row-cols-1 row-cols-md-12 d-flex flex-row justify-content-center p-4 regbodform'>

                    
                    
                
                    <div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='uname' className="form-control form-control-sm" onChange={(e)=>{this.setState({username : e.target.value})}} type="text" placeholder="UserName" aria-label=".form-control-sm example" />
                    </div>


                    <div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='fname' className="form-control form-control-sm" onChange={(e)=>{this.setState({fullname : e.target.value})}} type="text" placeholder="Full Name" aria-label=".form-control-sm example" />
                    </div><div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='email' className="form-control form-control-sm" onChange={(e)=>{this.setState({email : e.target.value})}} type="text" placeholder="Email@" aria-label=".form-control-sm example" />
                    </div><div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='country' className="form-control form-control-sm" onChange={(e)=>{this.setState({country : e.target.value})}} type="text" placeholder="Country" aria-label=".form-control-sm example" />
                    </div><div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='birth' className="form-control form-control-sm" onChange={(e)=>{this.setState({birth : e.target.value})}} type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" />
                    </div><div className='col col-md-6 d-flex justify-content-center mb-2'>
                    <input id='age' className="form-control form-control-sm" onChange={(e)=>{this.setState({age : e.target.value})}} type="number" min='9' max='100' placeholder="Age" aria-label=".form-control-sm example" />
                    </div><div className='col col-md-12 d-flex justify-content-center mb-2'>
                    <select className="form-select form-select-sm"  onChange={(e)=>{this.setState({gender : e.target.value})}} aria-label=".form-select-sm example">
                    <option selected disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    </select>
                    </div>
                    

                    <div className='col col-md-6 d-flex justify-content-center mb-3'>
                    <input id='pass' className="form-control form-control-sm"  onChange={(e)=>{this.setState({password : e.target.value})}} type="text" placeholder="Password" aria-label=".form-control-sm example" />
                    </div>
                    <div className='col col-md-6 d-flex justify-content-center mb-3'>
                    <input id='cpass' className="form-control form-control-sm"  onChange={(e)=>{this.setState({confirmPassword : e.target.value})}} type="text" placeholder="Confirm Password" aria-label=".form-control-sm example" />
                    </div>


                    <div className='col col-md-12 d-flex justify-content-center'>
                    <button type="button" className="btn btn-sm btn-danger" onClick={(e)=>{this.registerUser(e)}}>Register</button>
                    </div>

                </div>
                <sub className='regclick mt-3'>Want To Login ? <Link className='linkhreflines' to="/login">CLICK HERE</Link></sub>
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

export default Reg
