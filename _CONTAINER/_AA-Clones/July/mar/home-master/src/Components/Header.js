import React, { Component } from 'react';
import ParticlesBg from "particles-bg";

class Header extends Component {
   render() {

      if(this.props.data){
         // var project = this.props.data.project;
         var profilepic= "images/"+this.props.data.image;
         var github = this.props.data.github;
         var linkedin = this.props.data.linkedin;
         var name = this.props.data.name;
         var description1= this.props.data.description1;
         var description2= this.props.data.description2;
         var description3= this.props.data.description3;
         var description4= this.props.data.description4;
         var resumeDownload = this.props.data.resumedownload;
         // var city= this.props.data.address.city;
         // var networks= this.props.data.social.map(function(network){
         //    return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
         // })
      }

      return (
         <header id="home">
         <ParticlesBg type="cobweb" color="#0d6ca8" bg={true} />
         <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

            <ul id="nav" className="nav">
               <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
               <li><a className="smoothscroll" href="#skills">Skills</a></li>
               <li><a className="smoothscroll" href="#projects">Projects</a></li>
               <li><a className="smoothscroll" href="#resume">Resume</a></li>
               <li><a className="smoothscroll" href="#contact-info">Contact</a></li>
               {/* <li><a className="smoothscroll" href="#contact">Contact</a></li> */}
            </ul>
         </nav>

         <div className="row banner">
            
            <img className="banner-pic"  src={profilepic} alt="Profile Pic" />
            <div className="banner-text">
               <h1 className="responsive-headline">{name}</h1>
               <h3>{description1}</h3>
               <h3>{description2}</h3>
               <h3>{description3}</h3>
               <h3>{description4}</h3>
               <hr />
               <ul className="social">
                  {/* <a href={project} className="button btn project-btn"><i className="fa fa-book"></i>Project</a> */}
                  <li>
                     <a href={github} className="button btn github-btn" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i>Github</a>
                  </li>
                  <li>
                     <a href={linkedin} className="button btn linkedin-btn" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i>LinkedIn</a>
                  </li>
                  <li>
                     <a href={resumeDownload} className="button" target="_blank" rel="noopener noreferrer"><i className="fa fa-download"></i>Resume</a>
                  </li>
               </ul>
            </div>
         </div>

         <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
         </p>

         </header>
      );
   }
}

export default Header;
