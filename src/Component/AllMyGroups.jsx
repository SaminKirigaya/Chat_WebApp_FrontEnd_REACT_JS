import React, { Component, Fragment } from 'react'
import { io } from 'socket.io-client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';


const socket = io('http://localhost:8000');


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
export class AllMyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allgroups : []
        }
        socket.on('notification', (data)=>{
            localStorage.setItem('totalNots',data)
        })
    }

    async componentDidMount(){

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

    async componentDidUpdate(prevProps){
        // send that user left message box
        
        if(this.props.element != prevProps.element){
        
            this.componentDidMount()
        }
      }


    showgroups = ()=>{
        if(this.state.allgroups.length>0){
            return  this.state.allgroups.map((each)=>{
                return  <tr>
                <th scope="row" className='groupname'>{each.groupname}</th>
                <td className='purpose'>{each.purpose}</td>
                <td>{each.country}</td>
                <td>{formatDate(each.createdAt)}</td>
                <td><button onClick={(e)=>{this.loginNow(e)}} type="button" className="btn btn-sm btn-danger tspn me-3"><AddCircleIcon /></button> <button onClick={(e)=>{this.loginNow(e)}} type="button" className="btn btn-sm btn-danger tspn"><DeleteForeverIcon /></button></td>
              </tr>
            })
        }
      }

      showNoGroups = ()=>{
        if(this.state.allgroups.length==0){
            return  <div><p className='pinktxt'>You Did Not Create Any Group Yet ...</p></div>
        }
      }
    
  render() {
    return (
        <Fragment>
            <div className='allmygroups d-flex align-items-center p-o m-0 flex-column'>
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
            </div>
        </Fragment>
    )
  }
}

export default AllMyGroups
