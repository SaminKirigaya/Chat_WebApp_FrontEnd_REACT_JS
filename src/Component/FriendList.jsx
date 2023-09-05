import React, { Component, Fragment } from 'react'
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { io } from 'socket.io-client';

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

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TelegramIcon from '@mui/icons-material/Telegram';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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
  
export class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchname : '',
            friendData : [],
            open: false,
            returnMessage : ''
        }

        socket.on('notification', (data)=>{
            localStorage.setItem('totalNots',data)
        })
    }

    unfriend = async(e, idno)=>{
        const slno = this.props.slno;
        try{
            const response = await axios({
                url : `/unfriendHim/${slno}`,
                method : 'post',
                data : {
                    thisGuy : idno
                }
            });

            if(response.data.message == 'Successfully Unfriended This User ...'){
                setTimeout(()=>{window.location.reload()},500)
            }

            this.setState({
                returnMessage : response.data.message,
                open : true
              })

        }catch(err){
            console.log(err)
        }
    }

    showAllFriends = ()=>{
        if(this.state.friendData){
            if(this.state.friendData.length>0){
                return this.state.friendData.map((each, index)=>{
                    return <div className='col' key={index}>
                    <div className="card cardwidth cardwidth2 brdred profilecardbg mb-4 cardanim">
                    <div className='mx-auto mt-4 anim'>
                    <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={each.image} sx={{ width: 56, height: 56, border: '0.13rem solid #dd3d8a' }}
                    />
                
                    </Stack>
                    </div>
                    
                    
                    <div className="card-body d-flex flex-column align-items-center bodfont">
                      <h5 className="card-title headfont"><PersonIcon fontSize='large'/><b>@_{each.username}</b></h5>
                      <p className="card-text"><BadgeIcon/> <span className='bolding'>Full Name : </span>{each.fullname}<br></br><PublicIcon /> <span className='bolding'>Country : </span>{each.country}<br></br><AccessibilityNewIcon /> <span className='bolding'>Age : </span>{each.age}<br></br><WcIcon /> <span className='bolding'>Gender : </span>{each.gender}</p>
                      <Link to={'/message/'+each._id} className="btn btn-sm btn-danger btndescardprofile text-center"><TelegramIcon /> Message</Link>
                      <Link to='#' onClick={(e)=>{this.unfriend(e,each._id)}} className="btn btn-sm btn-danger btndescardprofile text-center mt-1"><PersonRemoveIcon /> Unfriend !</Link>
                    </div>
                    </div>

                    </div>

                })
            }
        }else{
            return <div className='col mx-auto mt-4 nofriend bodfont'>
                <h5>UwU You Dont Have Any Friend ...</h5>
            </div>
        }
    }

    async componentDidMount(){
        const slno = this.props.slno;

        try{


            const response = await axios.get(`/allMyFriends/${slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    
            if(response.data.message == 'success'){
                this.setState({
                    friendData : response.data.friends
                })
                
            }

            if(this.props.element != 9){
               
                    const res = await axios.get(`/setmeoutmsgbox/${slno}`,{
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    })
               
            }




        }catch(err){
            console.log(err)
        }

      
        
        socket.emit('authenticate', slno);
    }


    async componentDidUpdate(prevProps){
        // send that user left message box
     
        if(this.props.element != prevProps.element){
          this.componentDidMount()
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
                <div className='container-fluid d-flex justify-content-center mainnav p-0'>
                    <div className='container m-0 p-1 searchmain bodfont'>
                    <div className="input-group mb-3">
                    <input onChange={(e)=>{this.setState({searchname : e.target.value})}} type="text" class="form-control" placeholder="Search People username or Name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <Link to={'/searchresult/'+this.state.searchname} className="btn btn-outline-secondary desbtnsearch" type="button" id="button-addon2"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 -6 24 24" data-testid="ZoomOutIcon"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></svg></Link>
                    </div>
                    </div>

                    
                </div>
                <h4 className='tagsearch headfont'>Friend List :</h4>
                <div className='friendbox'>
                    <div className='row row-cols-1 row-cols-md-3 bdisppad'>


                    {this.showAllFriends()}

                    

                    {!(this.state.friendData.length>0) ? <div className='col mx-auto mt-4 nofriend bodfont'>
                    <h5 className='text-center'>UwU You Got No Friends Uwuuuuuu ...</h5>
                    </div> : null}

                    
                        
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

export default FriendList
