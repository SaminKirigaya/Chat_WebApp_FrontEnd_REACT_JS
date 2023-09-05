import React, { Component, Fragment, Suspense } from 'react'
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Groups2Icon from '@mui/icons-material/Groups2';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import BuildIcon from '@mui/icons-material/Build';
import Cookies from 'js-cookie';

import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


const Login = React.lazy(()=>import('../Component/Login'));
const Reg = React.lazy(()=>import('../Component/Reg'));
const ForgotPass = React.lazy(()=>import('../Component/ForgotPass'));
const VerifyMe = React.lazy(()=>import('../Component/VerifyMe'));
const UserProfile = React.lazy(()=>import('../Component/UserProfile'));
const EditProfile = React.lazy(()=>import('../Component/EditProfile'));
const Logout = React.lazy(()=>import('../Component/Logout'));
const DeleteId = React.lazy(()=>import('../Component/DeleteId'));
const ChangeEmote = React.lazy(()=>import('../Component/ChangeEmote'));
const FriendList = React.lazy(()=>import('../Component/FriendList'));
const SearchResult = React.lazy(()=>import('../Component/SearchResult'));
const FriendReqAll = React.lazy(()=>import('../Component/FriendReqAll'));
const Messaging = React.lazy(()=>import('../Component/Messaging'));
const Notification = React.lazy(()=>import('../Component/Notification'));
const CreateGroup = React.lazy(()=>import('../Component/CreateGroup'));
const AllMyGroups = React.lazy(()=>import('../Component/AllMyGroups'));
const AllGroupIChat = React.lazy(()=>import('../Component/AllGroupIChat'));
const GroupChat = React.lazy(()=>import('../Component/GroupChat'));
const HomePage = React.lazy(()=>import('../Component/HomePage'));

export class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : '',
            image : '',
            slno : '',
            notiamount : 0,
            totalNots: localStorage.getItem('totalNots') || 0,
            lastThree : [],
            user0recverId : '',
            user0avatar : '',
            user1recverId : '',
            user1avatar :'',
            user2recverId :'',
            user2avatar:'',
            doneload : false
        }

        
    }

    async   componentDidMount(){
        

        // set auto notif check from server live message every 2 secs nothing will change if no new data is there or amount is changed
        this.intervalId = setInterval(() => {
            const updatedTotalNots = localStorage.getItem('totalNots');
            if (updatedTotalNots !== this.state.totalNots) {
              this.setState({ totalNots: updatedTotalNots });
        
            }

            if(localStorage.getItem('user0avatar') && localStorage.getItem('user0recverId')){
                if (localStorage.getItem('user0recverId') !== this.state.user0recverId) {
                    this.setState({ 
                        user0recverId : localStorage.getItem('user0recverId'),
                        user0avatar : localStorage.getItem('user0avatar')
                    });
                   
                  }
            }
            
            if (localStorage.getItem('user1avatar') && localStorage.getItem('user1recverId')) {
                if (localStorage.getItem('user1recverId') !== this.state.user1recverId) {
                this.setState({ 
                    user1recverId : localStorage.getItem('user1recverId'),
                    user1avatar : localStorage.getItem('user1avatar')
                });
            }
            }
            
            
            if (localStorage.getItem('user2avatar') && localStorage.getItem('user2recverId')){
                if (localStorage.getItem('user2recverId') !== this.state.user2recverId) {
                this.setState({ 
                    user2recverId : localStorage.getItem('user2recverId'),
                    user2avatar : localStorage.getItem('user2avatar')
                });
            }
            }
        

          }, 2000);
        
        
          // check initially at start if u logged in
        if(localStorage.getItem('token')){
            try{
                const response = await axios.get(`/amILogged/${localStorage.getItem('token')}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })

                if(response.status == 200){
                    if(response.data.message == 'You are logged in.'){
                         this.setState({
                            token : localStorage.getItem('token'),
                            image : localStorage.getItem('image'),
                            slno : localStorage.getItem('slno')
                        })
                        
                    }else if(response.data.message == 'You are not logged in.'){
                        localStorage.clear();
                    }
                    console.log(this.state)
                }


                // get total notifications about last time u logged out
                if(this.state.slno){
                 
                        try{
                            const res3 = await axios.get(`/getTotalNotiAmount/${this.state.slno}`,{
                                headers : {
                                    'Content-Type' : 'application/json'
                                }
                            });
                            
    
                            const res4 = await axios.get(`/getLastThree/${this.state.slno}`,{
                                headers : {
                                    'Content-Type' : 'application/json'
                                }
                            });
    
                            const [response3, response4] = await Promise.all([res3,res4])
    
                            if(response3.data.message == 'success'){
                                
                                localStorage.setItem('totalNots', response3.data.amount)
                               
                            }
                            if(response4.data.message == 'success'){
                                
                                this.setState({
                                    lastThree : response4.data.lastguys
                                })

                                console.log(this.state)
                               
                               
                            }
                        }catch(err){
                            console.log(err)
                        }
                        

                    
                }

                
            }catch(err){
                console.log(err)
            }
        }
    }

   
   
    componentWillUnmount() {
        clearInterval(this.intervalId);
        
      }
    
   
      // circle loading anim
    loadingEffect = ()=>{
        return  <div className='container-fluid loader d-flex justify-content-center align-items-center'>
            <div className="spinner-border text-danger" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            
            
        </div>
    }

    // initially at loading show last three guys we messaged ...

    showLastThreeGuys = ()=>{
        if(this.state.lastThree.length>0){
            if(this.state.lastThree.length>3){
                for(var i=0;i<3;i++){
                    return  <div className='mb-2 anim'>
                    <Link to={'/message/'+this.state.lastThree[i].recverId}><Avatar fontSize="small" alt="Remy Sharp" src={this.state.lastThree[i].recvAvatar} /></Link>
                    </div>
                }
            }else if(this.state.lastThree.length<3){
                return  this.state.lastThree.map((each)=>{
                    return  <div className='mb-2 anim'>
                    <Link to={'/message/'+each.recverId}><Avatar fontSize="small" alt="Remy Sharp" src={each.recvAvatar} /></Link>
                    </div>
                })
            }
        }
    }

    localLastThree = ()=>{
        return  <div><div className='mb-2 anim'>
        <Link to={'/message/'+localStorage.getItem('user0recverId')}><Avatar fontSize="small" alt="Remy Sharp" src={localStorage.getItem('user0avatar')} /></Link>
        </div>  
        {localStorage.getItem('user1recverId') && localStorage.getItem('user1avatar') ? <div className='mb-2 anim'>
        <Link to={'/message/'+localStorage.getItem('user1recverId')}><Avatar fontSize="small" alt="Remy Sharp" src={localStorage.getItem('user1avatar')} /></Link>
        </div> : null}

        {localStorage.getItem('user2recverId') && localStorage.getItem('user2avatar') ? <div className='mb-2 anim'>
        <Link to={'/message/'+localStorage.getItem('user2recverId')}><Avatar fontSize="small" alt="Remy Sharp" src={localStorage.getItem('user2avatar')} /></Link>
        </div> : null}
        
        </div>
    }

  render() {
    return (
        <Router>
        <Fragment>
           


            <div className='container-fluid d-flex flex-column align-items-center sidenav'>
                <div className='mb-5'>
                   <ForumIcon fontSize='large' color='white'/>
                    
                </div>

                <div className='mb-2 anim specialava'>
                    {this.state.token == '' ? <Link className='verifyme' to='/login'><AccountCircleIcon fontSize='large'/></Link> : <Stack direction="row" spacing={2}>
                        <Link to='/userProfile'><Avatar alt="Remy Sharp" src={this.state.image} /></Link>
                    
                  </Stack>}
                </div>
                
                {localStorage.getItem('user0recverId') && localStorage.getItem('user0avatar') ? this.localLastThree() : this.showLastThreeGuys()}
                

                <MoreVertIcon />
                <MoreVertIcon />

                {this.state.token == '' ? 
                <div className='mt-2 mb-1 anim'>
                    <Link className='verifyme' to='/verifyMe'><CheckCircleOutlineIcon fontSize='large'/></Link>
                    
                </div>: null}

                {this.state.token != '' ? 
                <div className='mt-2 mb-1 anim'>
                    <Link className='verifyme' to='/myNotification'><NotificationsActiveIcon fontSize='large'/><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badgebg bg-danger">
                    {this.state.totalNots}
                    
                  </span></Link>
                </div>
                : null}



                {
                    this.state.token != '' ? 
                <div className='mb-2 mt-1 anim'>
                    <Link className='verifyme' to='/friendReqAll'><PersonAddIcon fontSize='large'/></Link>
                </div>
                : null
                }


                {
                    this.state.token != '' ? 
                <div className='mb-2 mt-1 anim'>
                    <Link className='verifyme' to='/friendList'><Diversity1Icon fontSize='large'/></Link>
                </div>
                : null
                }
                

                {
                    this.state.token != '' ? 
                <div className='mb-2 mt-1 anim'>
                    <Link className='verifyme' to='/createGroup'><Groups2Icon fontSize='large'/></Link>
                </div>
                : null
                }
                
                {
                    this.state.token != '' ? 
                <div className='mb-2 mt-1 anim'>
                    <Link className='verifyme' to='/allMyGroups'><BuildIcon fontSize='large'/></Link>
                </div>
                : null
                }



                {
                    this.state.token != '' ? 
                <div className='mb-2 mt-1 anim'>
                    <Link className='verifyme' to='/allGroupsIchat'><ConnectWithoutContactIcon fontSize='large'/></Link>
                </div>
                : null
                }


                
                {this.state.token != '' ?  <div className='mb-2 mt-1 anim'>
                <Link className='verifyme' to='/logout'><LogoutIcon fontSize='large' /></Link>
                </div> : null}
                

                
                
            </div>


            <div className='container-fluid d-flex justify-content-center mainnav p-0'>

            <Suspense fallback={this.loadingEffect()}>
                <Switch>
                    <Route exact path='/' component={()=>(<HomePage />)} />
                    <Route exact path='/login' component={()=>(<Login />)} />
                    <Route exact path='/registration' component={()=>(<Reg />)} />
                    <Route exact path='/forgotpass' component={()=>(<ForgotPass />)} />
                    <Route exact path='/verifyMe' component={()=>(<VerifyMe />)} />
                    <Route exact path='/userProfile' component={()=>(<UserProfile element={1} image={this.state.image} slno={this.state.slno}/>)} />
                    <Route exact path='/editProfile/:userslno' component={(props)=>(<EditProfile element={2} image={this.state.image} slno={this.state.slno} {...props}/>)} />
                    <Route exact path='/logout' component={(props)=>(<Logout element={3} userslno={this.state.slno} image={this.state.image} {...props}/>)} />
                    <Route exact path='/deleteID/:slno' component={(props)=>(<DeleteId element={4} userId={this.state.slno} image={this.state.image} {...props}/>)} /> 
                    <Route exact path='/changeEmote/:slno' component={(props)=>(<ChangeEmote element={5} userId={this.state.slno} {...props}/>)} />
                    <Route exact path='/friendList' component={()=>(<FriendList element={6} slno={this.state.slno}/>)} />
                    <Route exact path='/searchresult/:searchData' component={(props)=>(<SearchResult element={7} slno={this.state.slno} {...props}/>)} />
                    <Route exact path='/friendReqAll' component={()=>(<FriendReqAll element={8} slno={this.state.slno} />)} />
                    <Route exact path='/message/:friendId' component={(props)=>(<Messaging element={9} userId={this.state.slno} image={this.state.image} token={this.state.token} {...props}/>)} />
                    <Route exact path='/myNotification' component={()=>(<Notification element={10} slno={this.state.slno} />)} />
                    <Route exact path='/createGroup' component={()=>(<CreateGroup element={11} slno={this.state.slno} image={this.state.image}/>)} />
                    <Route exact path='/allMyGroups' component={()=>(<AllMyGroups element={12} slno={this.state.slno} image={this.state.image}/>)} />
                    <Route exact path='/allGroupsIchat' component={()=>(<AllGroupIChat element={13} slno={this.state.slno} image={this.state.image}/>)} />
                    <Route exact path='/groupChat/:groupname' component={(props)=>(<GroupChat element={14} userId={this.state.slno} image={this.state.image} token={this.state.token} {...props}/>)} />

                </Switch>
            </Suspense>

            </div>


            
        </Fragment>
        </Router>
    )
  }
}

export default Nav
