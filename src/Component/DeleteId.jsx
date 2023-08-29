import React, { Component, Fragment } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { io } from 'socket.io-client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


const socket = io('http://localhost:8000');
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export class DeleteId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnMessage : '',
      open : false
    }

    socket.on('notification', (data)=>{
      localStorage.setItem('totalNots',data)
  })

  }

  async componentDidMount(){
    const { slno } = this.props;
      
      socket.emit('authenticate', slno);
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


  DeleteMe=async (e)=>{
    const {slno} = this.props.match.params;
    try{
      const response = await axios.get(`/deleteId/${slno}`,{
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      if(response.data.message == 'Successfully Deleted Account ... Thanks For Staying With Us All This Time.'){
        localStorage.clear();

        setTimeout(()=>{window.location.href = '/login'},1800);

      }

      this.setState({
        returnMessage : response.data.message,
        open : true
      })

    }catch(err){
      console.log(err)
    }
  }
  
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex flex-column justify-content-center align-items-center'>
              <h3 className='loginstylelout loganimtxt zind'>Delete !!!</h3>
              <div className="card mb-3 profilecardbg">
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center mt-5 mt-md-0">
                  
                <Stack direction="row" spacing={2}>
                
                
                <Avatar
                  alt="Remy Sharp"
                  src={this.props.image}
                  sx={{ width: 56, height: 56, border: '0.13rem solid #dd3d8a' }}
                />
              </Stack>



                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    
                    <p className="card-text">You sure you want to Delete Account ??? Once Deleted no turning back !!!</p>
                    <Link to='#' onClick={(e)=>{this.DeleteMe(e)}} className="btn btn-sm btn-danger btndescardprofile mt-1"><DeleteIcon />Delete !</Link>
                  </div>
                </div>
                </div>
              </div>
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

export default DeleteId
