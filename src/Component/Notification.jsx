import React, { Component, Fragment } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { io } from 'socket.io-client';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';

const socket = io('http://localhost:8000');
export class Notification extends Component {
    constructor(props) {
        super(props);
        this.state={
            allNoti : []
        }
        
        socket.on('notification', (data)=>{
            localStorage.setItem('totalNots',data)
        })
    }
    
    async componentDidMount(){
        const {slno} = this.props;
        try{
            // logic for rest api of notification
            const response = await axios.get(`/getNoti/${slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message == 'success'){
                this.setState({
                    allNoti : response.data.notis
                })
                console.log(this.state.allNoti)
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

        if(this.props.element != prevProps.element || this.props.element != prevProps.element){
            this.componentDidMount();
        }

            // send that user left message box
            
        }
    

    delThis = async(e, idno)=>{
        const {slno} = this.props;
        try{

            const response = await axios({
                url : `/delthisNoti/${slno}`,
                method : 'post',
                data : {
                    notino : idno
                }
            });

           
                var newNots = localStorage.getItem('totalNots');
                if(newNots>0){
                newNots = newNots-1;
                }
                localStorage.setItem('totalNots',newNots);
            

        }catch(err){
            console.log(err)
        }
    }

    showNotis = ()=>{
        if(this.state.allNoti.length>0){
            return  this.state.allNoti.map((each)=>{
                return  <div className="card cardwid sizebigmsg bodfont">
                <div className="card-body">
                    <p className="card-title d-flex flex-row text-left wball"><Avatar alt="Remy Sharp" src={each.image} /> &nbsp;<span className='ps-3'>{each.alert} ....... <Link to={'/message/'+each.senderID} onClick={(e)=>{this.delThis(e,each._id)}} className="btn btn-sm btn-danger btndescardprofile text-center"><button type="button" className="btn btn-sm btn-danger btndescardprofile text-center ms-auto">Check Message</button></Link></span></p>
                    
                   
                    
                </div>
                </div>
            })

        }else{
            return  <div className="card cardwid sizebigmsg bodfont">
            <div className="card-body">
                <p className="card-title d-flex flex-row text-center wball"><span className='ps-3 mx-auto'>No New Notifications To Show ....</span></p>
                
               
                
            </div>
            </div>

        }
    }

    render() {
        return (
        <Fragment>
            <div className='notimain'>
                <div className="container-fluid p-0 m-0 d-flex align-items-center justify-content-center flex-column p-md-5" id="cardContainer">
                <h5 className='mx-auto mb-4 texdes headfont'>All Your Notifications : </h5>
                {this.showNotis()}
                



                </div>
            </div>
        </Fragment>
        )
    }

}

export default Notification
