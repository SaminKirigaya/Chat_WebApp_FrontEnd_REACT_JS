import React, { Component, Fragment, Suspense } from 'react'

import Nav from './Nav';
import Footer from './Footer';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    
    
  render() {
    return (
        
        
        <Fragment>  

            <Nav />
            <Footer /> 

        </Fragment>


        
    )
  }

}

export default Header
