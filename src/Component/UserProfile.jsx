import React, { Component, Fragment } from 'react'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteIcon from '@mui/icons-material/Delete';


import BadgeIcon from '@mui/icons-material/Badge';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PublicIcon from '@mui/icons-material/Public';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import WcIcon from '@mui/icons-material/Wc';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';

export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData : []
        }
    }

    dateConvert = (date)=>{
        var NewDate = new Date(date);
        var options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            
            
        };
        var convertedDate = NewDate.toLocaleString("en-US", options);

        return convertedDate;
    }
    
    async componentDidMount(){
        try{
            const response = await axios.get(`/getMyIdData/${this.props.slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message == 'success'){
                this.setState({
                    userData : response.data.userValue
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
        <h3 className='loginstyle loganimtxt zind'>PROFILE !!!</h3>
        <div className="card cardwidth profilecardbg">
        <div className='mx-auto mt-4 anim'>
        <Stack direction="row" spacing={2}>
        <Avatar alt="Remy Sharp" src={this.props.image} sx={{ width: 56, height: 56, border: '0.13rem solid #dd3d8a' }}
        />
    
        </Stack>
        </div>
        
        
        <div className="card-body">
          <h5 className="card-title"><PersonIcon fontSize='large'/>@_{this.state.userData.username}</h5>
          <p clasName="card-text"><BadgeIcon/> <span>Full Name : </span>{this.state.userData.fullname}<br></br><AttachEmailIcon /><span> Email : </span>{this.state.userData.email}<br></br><DateRangeIcon /> <span>Date of Birth : </span>{this.dateConvert(this.state.userData.dateOfBirth)}<br></br><PublicIcon /> <span>Country : </span>{this.state.userData.country}<br></br><AccessibilityNewIcon /> <span>Age : </span>{this.state.userData.age}<br></br><WcIcon /> <span>Gender : </span>{this.state.userData.gender}<br></br><TaskAltIcon/> <span>Joining Date : </span>{this.dateConvert(this.state.userData.joinedDate)}</p>
          <Link to={'/editProfile/'+this.state.userData._id} className="btn btn-sm btn-primary btndescardprofile"><ManageAccountsIcon />Edit Profile</Link><br></br>
          <Link to={'/changeEmote/'+this.state.userData._id} className="btn btn-sm btn-primary btndescardprofile mt-1"><InsertEmoticonIcon />Change Avatar</Link><br></br>
          <Link to={'/deleteID/'+this.state.userData._id} className="btn btn-sm btn-primary btndescardprofile mt-1"><DeleteIcon />Delete Account</Link>
        </div>
        </div>
        </div>
        </Fragment>
    )
  }
}

export default UserProfile
