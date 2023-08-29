import React, { Component, Fragment } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { io } from 'socket.io-client';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


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
  


export class ChangeEmote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnMessage : '',
            open : false,
            imageselected : ''
        }

        socket.on('notification', (data)=>{
          localStorage.setItem('totalNots',data)
      })

    }

    async componentDidMount(){


      const { slno } = this.props;
        
        socket.emit('authenticate', slno);
    }
    
    changeIt = (name, idname)=>{
      this.setState({
        imageselected : name
      })

      const totalid = ["id1","id2","id3","id4","id5","id6","id7","id8","id9"];
      totalid.map(async(each)=>{
        if(each == idname){
          document.getElementById(each).classList.add('getBig')
        }else{
          try{
            document.getElementById(each).classList.remove('getBig')
          }catch(err){
            console.log(err)
          }
          
        }
      })

    }

    // material ui snakebar
    handleClick = () => {
      this.setState({open : true})
    };
  
    // material ui snakebar
  handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }

  this.setState({open : false})
  };


  changeAvatar=async(e)=>{
    const {slno} = this.props.match.params;
    try{
      const response = await axios(
        {
          url : `/changeAvatar/${slno}`,
          method : 'post',
          data : {
            imagelink : this.state.imageselected
          }
        }
      )

      if(response.data.message == 'User Avatar successfully updated ... Please log in again to confirm it was you ...'){
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
      <div className='container-fluid d-flex flex-column justify-content-center mainnav p-0'>
            <h2 className='mb-4 mx-auto avat'>Select Your Avatar </h2>

            <div class="card cardb d-flex justify-content-start mx-auto" >
            <Stack direction="row" spacing={2}>
            <div id='id1' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat1.jpg",'id1')}}><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat1.jpg" sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a'}}
            /></div>
        
            <div id='id2' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat2.jpg",'id2')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat2.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

             <div id='id3' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat3.jpg",'id3')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat3.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

            <div id='id4' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat4.jpg",'id4')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat4.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

            <div id='id5' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat5.jpg",'id5')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat5.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

            
            
            </Stack>
            
            

            </div>

            <div className='card cardb mt-4 mx-auto'>
            <Stack direction="row" spacing={2}>

            <div id='id6' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat6.jpg",'id6')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat6.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a', 
              // your hover animation styles here
              
              
            }}
            /></div>
            

            <div id='id7' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat7.jpg",'id7')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat7.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

            <div id='id8' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat8.jpg",'id8')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat8.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

            <div id='id9' className='anim' onClick={(e)=>{this.changeIt("http://localhost:8000/public/images/cat9.jpg",'id9')}}><Avatar alt="Remy Sharp" src='http://localhost:8000/public/images/cat9.jpg' sx={{ width: 46, height: 46, border: '0.13rem solid #dd3d8a' }}
            /></div>

           
            
            </Stack>
            </div>

            <div className='container-fluid d-flex justify-content-center align-items-center mt-4'>
            <Link to='#' onClick={(e)=>{this.changeAvatar(e)}} className="btn btn-sm btn-primary btndescardprofile mt-1"><InsertEmoticonIcon /> Change Avatar</Link>
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

export default ChangeEmote
