import React, { Component } from 'react';

class About extends Component {
   render() {

      if(this.props.data){
         var name = this.props.data.name;
         var profilepic= "images/"+this.props.data.image;
         var bio1 = this.props.data.bio1;
         var bio2 = this.props.data.bio2;
         var bio3 = this.props.data.bio3;
         var specialtiesLabel = this.props.data.specialtiesLabel;
         var specialties = this.props.data.specialties;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone= this.props.data.phone;
         var email = this.props.data.email;
         var resumeDownload = this.props.data.resumedownload;
      }

      return (
         <section id="about">
            <div className="row">
               <div className="three columns">
                  <img className="profile-pic"  src={profilepic} alt="Profile Pic" />
               </div>
               <div className="nine columns main-col">
                  <h2>About Me</h2>

                  <p>{bio1}</p>
                  <p>{bio2}</p>
                  <p>{bio3}</p>
                  <p>{specialtiesLabel}</p>
                     {specialties.map((specialty, i) => (
                        <div key={i}>
                           {specialty}
                        </div>
                     ))}
                  <br />
                  <div className="row">
                     {/* <div className="columns contact-details">
                        <h2>Contact Details</h2>
                        <p className="address">
                           <span>{name}</span>
                           <span>{street}<br />
                                 {city} {state}, {zip}
                        </span><br />
                           <span>{phone}</span>
                           <span>{email}</span>
                        </p>
                     </div>
                     <div className="columns download">
                        <p>
                           <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Resume</a>
                        </p>
                     </div> */}
                  </div>
               </div>
            </div>
         </section>
      );
   }
}

export default About;
