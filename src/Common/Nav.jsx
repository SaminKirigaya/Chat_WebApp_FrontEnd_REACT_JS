import React, { Component, Fragment, Suspense } from 'react'
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


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


export class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : '',
            image : '',
            slno : ''
        }
    }

    async   componentDidMount(){
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

                console.log(this.state)
            }catch(err){
                console.log(err)
            }
        }
    }
    


    loadingEffect = ()=>{
        return  <div className='container-fluid loader d-flex justify-content-center align-items-center'>
            <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
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

                <div className='mb-2 anim'>
                    {this.state.token == '' ? <Link className='verifyme' to='/login'><AccountCircleIcon fontSize='large'/></Link> : <Stack direction="row" spacing={2}>
                        <Link to='/userProfile'><Avatar alt="Remy Sharp" src={this.state.image} /></Link>
                    
                  </Stack>}
                </div>
                
                <div className='mb-2 anim'>
                    <AccountCircleIcon fontSize='large'/>
                </div>

                <div className='mb-2 anim'>
                    <AccountCircleIcon fontSize='large'/>
                </div>

                <div className='mb-3 anim'>
                    <AccountCircleIcon fontSize='large'/>
                </div>

                <MoreVertIcon />
                <MoreVertIcon />

                <div className='mt-2 mb-1 anim'>
                    {this.state.token == '' ? <Link className='verifyme' to='/verifyMe'><CheckCircleOutlineIcon fontSize='large'/></Link> : null}
                    
                </div>

                <div className='mt-2 mb-1 anim'>
                    <MarkEmailUnreadIcon fontSize='large'/>
                </div>


                <div className='mb-2 mt-1 anim'>
                    <Diversity1Icon fontSize='large'/>
                </div>
                
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
                    <Route exact path='/userProfile' component={()=>(<UserProfile image={this.state.image} slno={this.state.slno}/>)} />
                    <Route exact path='/editProfile/:userslno' component={(props)=>(<EditProfile image={this.state.image} slno={this.state.slno} {...props}/>)} />
                    <Route exact path='/logout' component={(props)=>(<Logout userslno={this.state.slno} image={this.state.image} {...props}/>)} />
                    <Route exact path='/deleteID/:slno' component={(props)=>(<DeleteId image={this.state.image} {...props}/>)} /> 

                    </Switch>
            </Suspense>

            </div>


            
        </Fragment>
        </Router>
    )
  }
}

export default Nav
