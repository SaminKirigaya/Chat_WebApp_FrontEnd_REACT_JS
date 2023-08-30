import React, { Component, Fragment } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { io } from 'socket.io-client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const socket = io('http://localhost:8000');

export class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupname : '',
            purpose : '',
            country : '',
            returnMessage : '',
            open : false,
        }

        socket.on('notification', (data)=>{
            localStorage.setItem('totalNots',data)
        })
    }

    async componentDidMount(){
        socket.emit('authenticate', this.props.slno);
    }

    async componentDidUpdate(prevProps){
        // send that user left message box
        
        if(this.props.element != prevProps.element){
          
              this.componentDidMount()
          }
      }


    createGroup = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('groupname', this.state.groupname);
        formData.append('purpose', this.state.purpose);
        formData.append('country', this.state.country);
        try{
            const res = await axios.post(`/makeGroupAdmin/${this.props.slno}`, formData, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            if(res.data.message == 'Successfully Created The Group And Set You Admin ...'){

                this.setState({
                    groupname : '',
                    purpose : '',
                    country : ''
                })

                document.getElementById('uname').value = '';
                document.getElementById('purpose').value = '';
                document.getElementById('country').value = '';

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
            <div className='createGroup d-flex p-0 m-0 justify-content-center align-items-center flex-column'> 
            
            <h3 className='cgstyle loganimtxt'>Create Groups!!!</h3>
            <div className='row row-cols-1 row-cols-md-12 d-flex flex-row justify-content-center p-4'>

                    
            <div className='col col-md-9 d-flex justify-content-center mb-2 logobig'>
            <Avatar fontSize="large" alt="Remy Sharp" src={this.props.image} />
            </div>    
                
            <div className='col col-md-7 d-flex justify-content-center mb-2'>
            <input id='uname' className="form-control form-control-sm" onChange={(e)=>{this.setState({groupname : e.target.value})}} type="text" placeholder="Group Unique Name" aria-label=".form-control-sm example" />
            </div>


           <div className='col col-md-7 d-flex justify-content-center mb-2'>
            <textarea id='purpose' className="form-control form-control-sm rztxtarea" onChange={(e)=>{this.setState({purpose : e.target.value})}} type="text" placeholder="Purpose In Few Words ..." aria-label=".form-control-sm example" ></textarea>
            </div>


            <div className='col col-md-7 d-flex justify-content-center mb-2'>
            <input id='country' className="form-control form-control-sm" onChange={(e)=>{this.setState({country : e.target.value})}} type="text" placeholder="Country" aria-label=".form-control-sm example" />
            </div>
            


            <div className='col col-md-7 d-flex justify-content-center'>
            <button type="button" className="btn btn-sm btn-danger" onClick={(e)=>{this.createGroup(e)}}>Create Group</button>
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

export default CreateGroup
