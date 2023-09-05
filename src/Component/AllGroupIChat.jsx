import React, { Component } from 'react'
import { Fragment } from 'react'

import { io } from 'socket.io-client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import Diversity3Icon from '@mui/icons-material/Diversity3';
import CancelIcon from '@mui/icons-material/Cancel';

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
  
const formatDate = (olddate)=>{
    var newone = new Date(olddate);
    const options = {
        year : "numeric",
        month : "numeric",
        day : "numeric",
        hour : "numeric",
        minute : "numeric",
        hour12 : true
    }

    var newsetDate = newone.toLocaleString("en-US",options)

    return newsetDate
}



export class AllGroupIChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allgroups : [],
            returnMessage : '',
            open : false,
            left : false,
            shakalaka : false,
            availFriends : [],
            currentGroup : ''
        }
        
        socket.on('notification', (data)=>{
            localStorage.setItem('totalNots',data)
        })
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

    leaveThisGroup = async (e, groupName)=>{
        try{    
            const res= await axios({
                url: `/leaveThisGroup/${this.props.slno}`,
                method : 'post',
                data : {
                    groupname : groupName
                }
            })

            if(res.data.message == 'Successfully Left This Group ...'){

                this.setState({
                    left : true
                })

            }else{
                this.setState({
                    returnMessage : res.data.message,
                    open : true
                  })
            }

        }catch(err){
            console.log(err)
        }
    }


    showgroups = ()=>{
        if(this.state.allgroups.length>0){
            return  this.state.allgroups.map((each, index)=>{
                return  <tr className='bordcol' key={index}>
                <th scope="row" className='groupname'>{each.groupname}</th>
                <td className='purpose'>{each.purpose}</td>
                <td>{each.country}</td>
                <td>{formatDate(each.createdAt)}</td>
                <td className='btnalgn'><Link to={'/groupChat/'+each.groupname} type="button" className="btn btn-sm btn-danger tspn me-3"><SendIcon /></Link> <button onClick={(e)=>{this.leaveThisGroup(e,each.groupname)}} type="button" className="btn btn-sm btn-danger tspn"><MeetingRoomIcon /></button></td>
              
                </tr>

                
            })
        }
      }

    showNoGroups = ()=>{
    if(this.state.allgroups.length==0){
        return  <div><p className='pinktxt bodfont'>You Are Not Connected To Any Group Yet ...</p></div>
    }
    }


    async componentDidMount(){
        this.setState({
            left : false
        })
        socket.emit('authenticate', this.props.slno);
        if(this.props.element != 9){
            
            const res = await axios.get(`/setmeoutmsgbox/${this.props.slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
       
    }

        try{
            const res = await   axios.get(`/getMyJoinedGroups/${this.props.slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            if(res.data.message == 'success'){
                this.setState({
                    allgroups : res.data.mygroups
                })
            }

        }catch(err){
            console.log(err)
        }
    }

    async componentDidUpdate(prevProps, prevState){
        // send that user left message box
        
        if(this.props.element != prevProps.element || this.state.left != prevState.left){
        
            this.componentDidMount()
        }
      }
    
  render() {
    return (
        <Fragment>
        <div className='allmygroups p-o m-0 flex-column'>
        <h5 className='mb-4 mt-4 pinktxt headfont'>Your Connected Groups :</h5>
        <table className="table text-center tabledes bodfont">
        <thead>
          <tr>
            
            <th scope="col">Group Name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Country</th>
            <th scope="col">Created</th>
            <th scope="col">Chat or Leave</th>


          </tr>
        </thead>
        <tbody>
            {this.showgroups()}
          
        
        </tbody>
      </table>

        {this.showNoGroups()}

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
              fontFamily: 'Cormorant Infant'
            }}>
              {this.state.returnMessage}
            </Alert>
        </Snackbar>

           
        </div>
        </Fragment>
    )
  }
}

export default AllGroupIChat
