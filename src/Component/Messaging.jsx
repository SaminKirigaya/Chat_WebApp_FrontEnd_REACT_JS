import React, { Component, Fragment } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

import ScrollableFeed from 'react-scrollable-feed';

import Stack from '@mui/material/Stack';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8000');


function getCurrentDateTime() {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return now.toLocaleString('en-US', options);
  }

export class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : null,
            allmessages : [],
            message : '',
            placeval : 'Insert Message ...',
            disabled : false,
            username : ''
        }
        this.cardContainerRef = React.createRef();

        
        socket.on('privateMessage', (message) => {
            this.setState((prevState) => ({
              allmessages: [...prevState.allmessages, { text: message,  sender: this.props.match.params.friendId }],
            }));
          });
    }
    
    async componentDidMount(){
        const myusersl = this.props.userId;
        try{
            const response = await axios.get(`/getmyusername/${myusersl}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message == 'success'){
                this.setState({
                    username : response.data.username
                })
                
            }

        }catch(err){
            console.log(err)
        }
    
        socket.on('connect', () => {
            console.log('Connected to socket server');
          });
        const { userId } = this.props;
        
        socket.emit('authenticate', userId);
        
    }


 

    setImage= (e, file, filename)=>{
            if(file && filename){
                this.setState({
                    image : file,
                    message : '',
                    placeval : filename,
                    disabled : true
                })
            }else{
                this.setState({
                    image : null,
                    message : '',
                    placeval : 'Insert Message ...',
                    disabled : false
                })
            }
            
            
        
        
    }

    
    
  
    handleSendMessage = () => {
        const myImg = this.props.image;
        const userId = this.props.userId;
        const {friendId} = this.props.match.params;
        const Token = this.props.token;

        const { message, image } = this.state;
    
        if (message || image) {
          socket.emit('privateMessage', {
            fromUserId: userId,
            toUserId: friendId,
            myToken : Token,
            message: this.state.message,
            image: this.state.image,
            
            sendingtime : getCurrentDateTime()
           
          });
    
          this.setState((prevState) => ({
            allmessages: [
              ...prevState.allmessages,
              { text: message, sender: userId, senderAvatar : myImg, image: image , sendingtime: getCurrentDateTime(), username: this.state.username},
            ],
            message: '',
            image: null,
            placeval : 'Insert Message ...',
            disabled : false

          }));
        }
      };

      loadMessages = ()=>{
        const userId = this.props.userId;
        if(this.state.allmessages.length>0){
            return this.state.allmessages.map((each)=>{
                console.log(each)
                if(each.sender == userId){
                    if(each.text){
                        return  <div class="card mymsg">
                        <div class="card-body">
                            <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src={each.senderAvatar} /> &nbsp;{each.username}</h5>
                            <p class="card-text textbg">{each.text}</p>
                            <sup>{each.sendingtime}</sup>
                            
                        </div>
                        </div>
                    }else{

                        const blob = new Blob([each.image], { type: 'image/jpeg' });

                        // Create Data URL from Blob
                        const dataUrl = URL.createObjectURL(blob);

                        return  <div class="card mymsgimg">
                        <div class="card-body">
                            <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src={each.senderAvatar} /> &nbsp;{each.username}</h5>
                            
                            <img class='msgimgbox' src={dataUrl}/>
                            <sup>{each.sendingtime}</sup>
                            
                            
                        </div>
                        </div>
                    }
                    

                }else{
                    if(each.text[0].message){
                        return  <div class="card sendermsg">
                        <div class="card-body">
                            <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                            <p class="card-text textbg">{each.text[0].message}</p>
                            
                        </div>
                        </div>
        
                    }else{

                        const blob = new Blob([each.text[0].image], { type: 'image/jpeg' });

                        // Create Data URL from Blob
                        const dataUrl = URL.createObjectURL(blob);
                        return  <div class="card sendermsgimg">
                        <div class="card-body">
                            <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                            <img class='msgimgbox' src={dataUrl}/>
                            
                        </div>
                        </div>
                    }
                    
                }
            })
        }
      }

    render() {
        return (
            <Fragment>

                <div className='container-fluid sendingbox'>
                <div className="input-group mb-3">
                
                <label for='fileinp' className='me-2 imgcol'><AddPhotoAlternateIcon fontSize='large'/></label>
                <input id="fileinp" accept="image/jpeg, image/jpg" type='file' onChange={(e)=>{this.setImage(e,e.target.files[0],e.target.value)}}></input>
                
            
                <input id='txtmsg' type="text"  onChange={(e)=>{this.setState({message : e.target.value})}} value={this.state.message} className="form-control" placeholder={this.state.placeval} aria-label="Recipient's message" aria-describedby="button-addon2" disabled={this.state.disabled}/>
                <button className="btn btn-outline-secondary desbtnsearch" onClick={(e)=>{this.handleSendMessage(e)}} type="button" id="button-addon2"><SendIcon /></button>
              </div>
                </div>






                <ScrollableFeed className="card-container" id="cardContainer">
 
                {this.loadMessages()}




                </ScrollableFeed>


            </Fragment>
        )
    }
}

export default Messaging
