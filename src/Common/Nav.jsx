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

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



import {
    BrowserRouter as Router,
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

export class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : '',
            image : '',
            slno : '',
            notiamount : 0
        }
    }

    async   componentDidMount(){

        // set auto notif check from server live message every 2 secs
        setInterval(async()=>{
                try{
                    if(this.state.slno){
                     
    
                        const response3 = await  axios.get(`/getTotalNotiAmount/${this.state.slno}`,{
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        });
                        if(response3.data.message == 'success'){
                            localStorage.setItem('totalNots', response3.data.amount)
                        }
        
                    
                }
                }catch(err){
                    console.log(err)
                }
                
            
        },2000)


        if(localStorage.getItem('token')){
            try{
                const response = await axios.get(`/amILogged/${localStorage.getItem('token')}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })

                if(response.status == 200){
                    if(response.data.message == 'You are logged in.'){
                        await this.setState({
                            token : localStorage.getItem('token'),
                            image : localStorage.getItem('image'),
                            slno : localStorage.getItem('slno')
                        })
                        
                    }else if(response.data.message == 'You are not logged in.'){
                        localStorage.clear();
                    }
                    console.log(this.state)
                }

                if(this.state.slno){
                 

                        const response3 = await axios.get(`/getTotalNotiAmount/${this.state.slno}`,{
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        });
                        if(response3.data.message == 'success'){
                            this.setState({
                                notiamount : response3.data.amount
                            })
                            localStorage.setItem('totalNots', response3.data.amount)
                           
                        }

                    
                }

                
            }catch(err){
                console.log(err)
            }
        }
    }

    async componentDidUpdate(prevState){
        setInterval(()=>{
            if(prevState.notiamount != localStorage.getItem('totalNots')){
                
    
                this.renderNotif()
            }
        },2000)
        
    }
    
   

    loadingEffect = ()=>{
        return  <div className='container-fluid loader d-flex justify-content-center align-items-center'>
            <div className="spinner-border text-danger" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            
            
        </div>
    }

    renderNotif = ()=>{
        return  <div>{this.state.notiamount}</div>
    }

  render() {
    return (
        <Router>
        <Fragment>
           


            <div className='container-fluid d-flex flex-column align-items-center sidenav'>
                <div className='mb-5'>
                   <ForumIcon fontSize='large' color='white'/>
                    
                </div>

                <div className='mb-2 anim'>
                    {this.state.token == '' ? <Link className='verifyme' to='/login'><AccountCircleIcon fontSize='large'/></Link> : <Stack direction="row" spacing={2}>
                        <Link to='/userProfile'><Avatar alt="Remy Sharp" src={this.state.image} /></Link>
                    
                  </Stack>}
                </div>
                

                {this.state.token != '' ? <div className='mb-2 anim'>
                <AccountCircleIcon fontSize='large'/>
                </div> : null }
                

                {this.state.token !='' ? <div className='mb-2 anim'>
                <AccountCircleIcon fontSize='large'/>
                </div>:null}
                


                {this.state.token !='' ? <div className='mb-3 anim'>
                <AccountCircleIcon fontSize='large'/>
                </div>:null}
                

                <MoreVertIcon />
                <MoreVertIcon />

                {this.state.token == '' ? 
                <div className='mt-2 mb-1 anim'>
                    <Link className='verifyme' to='/verifyMe'><CheckCircleOutlineIcon fontSize='large'/></Link>
                    
                </div>: null}

                {this.state.token != '' ? 
                <div className='mt-2 mb-1 anim'>
                    <Link className='verifyme' to='/myNotification'><NotificationsActiveIcon fontSize='large'/><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badgebg bg-danger">
                    {this.state.notiamount}
                    
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
                
                {this.state.token != '' ?  <div className='mb-2 mt-1 anim'>
                <Link className='verifyme' to='/logout'><LogoutIcon fontSize='large' /></Link>
                </div> : null}
                

                
                
            </div>


            <div className='container-fluid d-flex justify-content-center mainnav p-0'>

            <Suspense fallback={this.loadingEffect()}>
                <Switch>
                    <Route exact path='/login' component={()=>(<Login />)} />
                    <Route exact path='/registration' component={()=>(<Reg />)} />
                    <Route exact path='/forgotpass' component={()=>(<ForgotPass />)} />
                    <Route exact path='/verifyMe' component={()=>(<VerifyMe />)} />
                    <Route exact path='/userProfile' component={()=>(<UserProfile element={1} image={this.state.image} slno={this.state.slno}/>)} />
                    <Route exact path='/editProfile/:userslno' component={(props)=>(<EditProfile element={2} image={this.state.image} slno={this.state.slno} {...props}/>)} />
                    <Route exact path='/logout' component={(props)=>(<Logout element={3} userslno={this.state.slno} image={this.state.image} {...props}/>)} />
                    <Route exact path='/deleteID/:slno' component={(props)=>(<DeleteId element={4} image={this.state.image} {...props}/>)} /> 
                    <Route exact path='/changeEmote/:slno' component={(props)=>(<ChangeEmote element={5} {...props}/>)} />
                    <Route exact path='/friendList' component={()=>(<FriendList element={6} slno={this.state.slno}/>)} />
                    <Route exact path='/searchresult/:searchData' component={(props)=>(<SearchResult element={7} slno={this.state.slno} {...props}/>)} />
                    <Route exact path='/friendReqAll' component={()=>(<FriendReqAll element={8} slno={this.state.slno} />)} />
                    <Route exact path='/message/:friendId' component={(props)=>(<Messaging element={9} userId={this.state.slno} image={this.state.image} token={this.state.token} {...props}/>)} />
                    <Route exact path='/myNotification' component={()=>(<Notification element={10} slno={this.state.slno} />)} />


                    </Switch>
            </Suspense>

            </div>


            
        </Fragment>
        </Router>
    )
  }
}

export default Nav
