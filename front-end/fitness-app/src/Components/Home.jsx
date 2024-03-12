import React from 'react'
import './Home.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='fitHome'>

        <div className='fitHomeFirst'>
            <h1 className='welcome'>Welcome to FitReady</h1>
            <p className='start'> Start your fitness journey here</p>
        </div>
        <div className='fitHomeSecond'>
            <div className='my-2'> <Link to={'/login'}><Button className='loginBtnHome'>Login</Button></Link></div>
            
            <div className='my-2'><Link to={'/signup'}><Button className='signUpBtnHome'>Sign Up</Button></Link></div>
        </div>
    </div>
  )
}

export default Home