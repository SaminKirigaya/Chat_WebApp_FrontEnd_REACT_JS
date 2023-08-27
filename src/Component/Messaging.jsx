import React, { Component, Fragment } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

import ScrollableFeed from 'react-scrollable-feed';

import Stack from '@mui/material/Stack';
import { io } from 'socket.io-client';

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
            disabled : false
        }
        this.cardContainerRef = React.createRef();

        socket.on('privateMessage', (message) => {
            this.setState((prevState) => ({
              allmessages: [...prevState.allmessages, { ...message, sender: this.props.friendId }],
            }));
          });
    }
    
    async componentDidMount(){
    
        const { userId } = this.props;
        socket.emit('authenticate', userId);
        
    }

 

    setImage= (e, file, filename)=>{
            if(file && filename){
                this.setState({
                    image : file,
                    placeval : filename,
                    disabled : true
                })
            }else{
                this.setState({
                    image : null,
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
            message: message,
            image: image,
          });
    
          this.setState((prevState) => ({
            allmessages: [
              ...prevState.allmessages,
              { text: message, sender: userId, senderAvatar : myImg, image: image , sendingTime: getCurrentDateTime()},
            ],
            message: '',
            image: null,
            placeval : 'Insert Message ...',
            disabled : false

          }));
        }
      };

    render() {
        return (
            <Fragment>

                <div className='container-fluid sendingbox'>
                <div className="input-group mb-3">
                
                <label for='fileinp' className='me-2 imgcol'><AddPhotoAlternateIcon fontSize='large'/></label>
                <input id="fileinp" accept="image/jpeg, image/jpg" type='file' onChange={(e)=>{this.setImage(e,e.target.files[0],e.target.value)}}></input>
                
            
                <input id='txtmsg' type="text"  onChange={(e)=>{this.setState({message : e.target.value})}} value={this.state.message} className="form-control" placeholder={this.state.placeval} aria-label="Recipient's message" aria-describedby="button-addon2" disabled={this.state.disabled}/>
                <button className="btn btn-outline-secondary desbtnsearch" onClick={this.handleSendMessage} type="button" id="button-addon2"><SendIcon /></button>
              </div>
                </div>






                <ScrollableFeed className="card-container" id="cardContainer">
 
                <div class="card mymsg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp;Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>



                <div class="card sendermsg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>



                <div class="card sendermsg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>



                <div class="card sendermsg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>





                <div class="card sendermsgimg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp; Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>



                <div class="card mymsgimg">
                <div class="card-body">
                    <h5 class="card-title d-flex flex-row text-center"><Avatar alt="Remy Sharp" src="http://localhost:8000/public/images/cat5.jpg" /> &nbsp;Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                </div>




                </ScrollableFeed>


            </Fragment>
        )
    }
}

export default Messaging
