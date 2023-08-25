import React, { Component, Fragment } from 'react'
import ZoomOutIcon from '@mui/icons-material/ZoomOut';


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


export class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchname : '',
            personData : []
        }
    }

    
    async componentDidMount(){
        
        const {searchData} = this.props.match.params;
        const slno = this.props.slno;

       
        if(searchData === ''){
            window.location.href = '/friendList'
        }
        try{

            const response = await axios({
                url : `/searchthisuser/${slno}`,
                method : 'post',
                data : {
                    person : searchData
                }
            })
    
            if(response.data.message == 'success'){
                this.setState({
                    personData : response.data.person
                })
            }


        }catch(err){
            console.log(err)
        }
        

    }

        
    async componentDidUpdate(prevProps){                    
        const {searchData} = this.props.match.params;
        if(prevProps.match.params.searchData != searchData){
            this.componentDidMount()
        }
    }
    
    render() {
        return (
            <Fragment>
                <div className='container-fluid d-flex justify-content-center mainnav p-0'>
                    <div className='container m-0 p-1 searchmain'>
                    <div className="input-group mb-3">
                    <input onChange={(e)=>{this.setState({searchname : e.target.value})}} type="text" class="form-control" placeholder="Search People username or Name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <Link to={'/searchresult/'+this.state.searchname} className="btn btn-outline-secondary desbtnsearch" type="button" id="button-addon2"><ZoomOutIcon /></Link>
                    </div>
                    </div>

                    
                </div>
                <h4 className='tagsearch'>Search Result :</h4>
                <div className='friendbox'>
                    <div className='row row-cols-1 row-cols-md-3'>


                        <div className='col'>
                        <div className="card cardwidth cardwidth2 brdred profilecardbg mb-4">
                        <div className='mx-auto mt-4 anim'>
                        <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat1.jpg" sx={{ width: 56, height: 56, border: '0.13rem solid #dd3d8a' }}
                        />
                    
                        </Stack>
                        </div>
                        
                        
                        <div className="card-body d-flex flex-column align-items-center">
                          <h5 className="card-title"><PersonIcon fontSize='large'/>@_{}</h5>
                          <p clasName="card-text"><BadgeIcon/> <span>Full Name : </span>{}<br></br><PublicIcon /> <span>Country : </span>{}<br></br><AccessibilityNewIcon /> <span>Age : </span>{}<br></br><WcIcon /> <span>Gender : </span>{}</p>
                          <Link to={'/editProfile/'} className="btn btn-sm btn-primary btndescardprofile text-center"><ManageAccountsIcon />Message</Link>
                          <Link to={'/changeEmote/'} className="btn btn-sm btn-primary btndescardprofile text-center mt-1"><InsertEmoticonIcon />Unfriend</Link>
                          
                        </div>
                        </div>

                        </div>






                        <div className='col'>
                        <div className="card cardwidth cardwidth2 brdred profilecardbg">
                        <div className='mx-auto mt-4 anim'>
                        <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat1.jpg" sx={{ width: 56, height: 56, border: '0.13rem solid #dd3d8a' }}
                        />
                    
                        </Stack>
                        </div>
                        
                        
                        <div className="card-body d-flex flex-column align-items-center">
                          <h5 className="card-title"><PersonIcon fontSize='large'/>@_{}</h5>
                          <p clasName="card-text"><BadgeIcon/> <span>Full Name : </span>{}<br></br><PublicIcon /> <span>Country : </span>{}<br></br><AccessibilityNewIcon /> <span>Age : </span>{}<br></br><WcIcon /> <span>Gender : </span>{}</p>
                          <Link to={'/editProfile/'} className="btn btn-sm btn-primary btndescardprofile text-center"><ManageAccountsIcon />Message</Link>
                          <Link to={'/changeEmote/'} className="btn btn-sm btn-primary btndescardprofile text-center mt-1"><InsertEmoticonIcon />Unfriend</Link>
                          
                        </div>
                        </div>

                        </div>





                        <div className='col mx-auto mt-4 nofriend'>
                            <h5>UwU You Dont Have Any Friend ...</h5>
                        </div>






                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SearchResult
