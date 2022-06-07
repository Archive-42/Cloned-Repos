import React, { Component } from 'react';

class Footer extends Component {
  render() {

    if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url} target="_blank" rel="noopener noreferrer"><i className={network.className}></i></a></li>
      })
    }

    return (
      <footer>

        <div className="row" id='contact-info'>
            <div className="twelve columns">
              <ul className="social-links">
                  {networks}
              </ul>

              <ul style={{ color: '#bbb', fontSize: '16px', fontWeight: 'bold'}}>
                <li>Mark McClatchy</li>
                <li>Asheville, NC</li>
                <li>markmcclatchy@gmail.com</li>
              </ul>
              
              <ul className="copyright">
                  <li>&copy; Copyright 2020 Mark McClatchy</li>
                  <li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li>
              </ul>
              
            </div>
            <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
