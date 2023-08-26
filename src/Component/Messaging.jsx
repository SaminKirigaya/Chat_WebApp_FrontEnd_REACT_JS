import React, { Component, Fragment } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';

import ScrollableFeed from 'react-scrollable-feed';

import Stack from '@mui/material/Stack';



export class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : null,
            message : '',
            placeval : 'Insert Message ...',
            disabled : false
        }
        this.cardContainerRef = React.createRef();
    }
    
    async componentDidMount(){
    
        
    }

    scrollToBottom = () => {
        if (this.cardContainerRef.current) {
            this.cardContainerRef.current.scrollTop = this.cardContainerRef.current.scrollHeight;
        }
    };


    componentDidUpdate() {
        this.scrollToBottom(); // Call scrollToBottom after the component updates
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
                    image : file,
                    placeval : filename,
                    disabled : false
                })
            }
            
            
        
        
    }

    scrollToBottom =()=>{
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.scrollTop = cardContainer.scrollHeight;
      }

    render() {
        return (
            <Fragment>

                <div className='container-fluid sendingbox'>
                <div className="input-group mb-3">
                
                <label for='fileinp' className='me-2 imgcol'><AddPhotoAlternateIcon fontSize='large'/></label>
                <input id="fileinp" accept="image/jpeg, image/jpg" type='file' onChange={(e)=>{this.setImage(e,e.target.files[0],e.target.value)}}></input>
                
            
                <input id='txtmsg' type="text"  onChange={(e)=>{this.setState({message : e.target.value})}} value={this.state.message} className="form-control" placeholder={this.state.placeval} aria-label="Recipient's message" aria-describedby="button-addon2" disabled={this.state.disabled}/>
                <button className="btn btn-outline-secondary desbtnsearch" type="button" id="button-addon2"><SendIcon /></button>
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




                </ScrollableFeed>


            </Fragment>
        )
    }
}

export default Messaging
