import React, { Component } from 'react';

class Portfolio extends Component {
  render() {

    if (this.props.data) {
      var projects = this.props.data.projects.map(function (projects, i) {
        var projectImage = 'images/portfolio/' + projects.image;
        
        return (
          <div key={projects.title} id={`portfolio-item-${i}`} className="columns portfolio-item">
            <a href={projects.url} title={projects.title} target="_blank" rel="noopener noreferrer">
              <div className="item-wrap">
                <img alt={projects.title} src={projectImage} />
                <div className="overlay">
                  <div className="portfolio-item-meta">
                    <h5>{projects.title}</h5>
                    <p>{projects.category}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )
      })
    }

    return (
      <section id="projects">

        {/* <div className="row"> */}

          <div className="project_wrapper">

            <h1>Check Out My Projects</h1>

            <div id="portfolio-wrapper" >
              {projects}
            </div>
          </div>
        {/* </div> */}
      </section>
    );
  }
}

export default Portfolio;
