import React, { Component, Fragment } from 'react'
import { io } from 'socket.io-client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export class AllMyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allgroups : [],
            returnMessage : '',
             open : false,
            deleted : false,
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


        handleModalOpen = async(e,groupId)=>{
            this.setState({
                shakalaka : true,
                availFriends : [],
                currentGroup : ''
            })
            try{
                const res = await axios({
                    url : `/getavailFriendsForGroup/${this.props.slno}`,
                    method : 'post',
                    data : {
                        group : groupId
                    }
                })

                if(res.data.message == 'success'){
                    this.setState({
                        currentGroup : groupId,
                        availFriends : res.data.friends
                    })
                }

            }catch(err){console.log(err)}
        }

        handlemodalClose = ()=>{
            this.setState({
                shakalaka : false,
                availFriends : [],
                currentGroup : ''
            })
        }

        
    async componentDidMount(){
        this.setState({
            deleted : false
        })
        socket.emit('authenticate', this.props.slno);

        try{
            const res= await axios.get(`/getMyCreatedGroups/${this.props.slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            if(res.data.message == 'success'){
                this.setState({
                    allgroups : res.data.allgroupmy
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    async componentDidUpdate(prevProps, prevState){
        // send that user left message box
        
        if(this.props.element != prevProps.element || this.state.deleted != prevState.deleted){
        
            this.componentDidMount()
        }
      }


      detThisGroup = async(e, groupID)=>{
        try{    
            const {slno} = this.props;
            const res = await axios({
                url : `/delThisGroup/${slno}`,
                method : 'post',
                data : {
                    grpId : groupID 
                }
            })

            if(res.data.message == 'Succefully Deleted The Group ...'){
                this.setState({
                    deleted : true
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

    showgroups = ()=>{
        if(this.state.allgroups.length>0){
            return  this.state.allgroups.map((each)=>{
                return  <tr className='bordcol'>
                <th scope="row" className='groupname'>{each.groupname}</th>
                <td className='purpose'>{each.purpose}</td>
                <td>{each.country}</td>
                <td>{formatDate(each.createdAt)}</td>
                <td className='btnalgn'><button type="button" className="btn btn-sm btn-danger tspn me-3" onClick={(e)=>{this.handleModalOpen(e,each._id)}}><AddCircleIcon /></button> <button onClick={(e)=>{this.detThisGroup(e,each._id)}} type="button" className="btn btn-sm btn-danger tspn"><DeleteForeverIcon /></button></td>
              
                </tr>

                
            })
        }
      }

      showNoGroups = ()=>{
        if(this.state.allgroups.length==0){
            return  <div><p className='pinktxt'>You Did Not Create Any Group Yet ...</p></div>
        }
      }


      addToGroupPerm = async(e,frndId,inx)=>{
        try{
            const res = await axios({
                url : `/addThisGuyGroup/${this.props.slno}`,
                method : 'post',
                data : {
                    frndSl : frndId,
                    groupID : this.state.currentGroup
                }
            })

            if(res.data.message == 'success'){
                var idname = 'friend'+inx;
                document.getElementById(idname).classList.add('disabled')
                document.getElementById(idname).classList.add('opct')
            }
        }catch(err){
            console.log(err)
        }
      }
    
      showAvailableFriend = ()=>{
        if(this.state.availFriends.length>0){
            return  this.state.availFriends.map((each, index)=>{
                return  <h5 id={'friend'+index} className='d-flex align-items-center brdbtm pb-2'>
                <Avatar fontSize="small" alt="Remy Sharp" src={each.image} /> &nbsp; {each.username}  <button onClick={(e)=>{this.addToGroupPerm(e,each._id, index)}} type="button" className="btn btn-sm btn-danger tspn ms-auto">Add Member</button> 
            </h5> 
            })
        }else{
            return  <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            Sad You Got No Friends ....
        </Typography>  
        }
      }


  render() {
    return (
        <Fragment>
            <div className='allmygroups p-o m-0 flex-column'>
            <h5 className='mb-4 mt-4 pinktxt'>Your Created Groups :</h5>
            <table class="table text-center tabledes">
            <thead>
              <tr>
                
                <th scope="col">Group Name</th>
                <th scope="col">Purpose</th>
                <th scope="col">Country</th>
                <th scope="col">Created</th>
                <th scope="col">Add or Delete</th>


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
                  color: 'white' // Set text color for visibility
                }}>
                  {this.state.returnMessage}
                </Alert>
            </Snackbar>


            <Modal
            open={this.state.shakalaka}
            onClose={this.handlemodalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Friend In Group...
            </Typography>
            <hr></hr>

            {this.showAvailableFriend()}

                  

            
            </Box>
            </Modal>
            



               
            </div>
            
        </Fragment>
    )
  }
}

export default AllMyGroups
