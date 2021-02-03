import React from 'react';

import './footer.css'
import profilePic from './mark.jpg';
import angelist from './angelist.svg';
import webIcon from './www.svg';

import Avatar from '@material-ui/core/Avatar';



export default function Footer() {
  
  
  
  return (
    <div className="footer_wrapper">
      <div className="avatar_wrapper">
        
        <Avatar 
        src={profilePic} 
        style={{ width: 60, height: 60 }}
        alt='My profile picture' 
        className='avatar' />
        
        <div className="my_info">
          <div className="name">Mark McClatchy</div>
          <div className="job_title">Full-Stack Software Engineer</div>
          <div className="email">markmcclatchy@gmail.com</div>
        </div>
        
      </div>
      
      <div className="links">
      
        
        <a
          href='https://markmcclatchy.com' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img src={webIcon} className='my-site' alt='my site link'/>
          <div className="top">
            <p>MySite</p>
          </div>
        </a>
        
        <a 
          href='https://www.linkedin.com/in/mark-mcclatchy-155367bb/' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img 
            src='https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg' 
            alt='LinkedIn link'
            className='linked-in' />
          <div className="top">
            <p>LinkedIn</p>
          </div>
        </a>
        
        <a
          href='https://angel.co/u/mark-mcclatchy' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img src={angelist} className='angelist' alt='angel list link' />
          <div className="top">
            <p>AngelList</p>
          </div>
        </a>
        
        <a 
          href='https://github.com/mmcclatchy' 
          target="_blank" 
          rel="noopener noreferrer"
          className='tooltip'
        > 
          <img 
            src="https://www.vectorlogo.zone/logos/github/github-icon.svg"
            alt='github link'
            className='github' />
          <div className="top">
            <p>GitHub</p>
          </div>
        </a>
        
      </div>
      
    </div>
  )
}