import React, { Component } from 'react'

export class HomePage extends Component {
    async componentDidMount(){
        if(localStorage.getItem('token')){
            window.location.href = '/userProfile'
        }else{
            window.location.href = '/login'
        }
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default HomePage
