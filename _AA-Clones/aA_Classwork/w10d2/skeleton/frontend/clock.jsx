import React from 'react';

export default class Clock extends React.Component {

  constructor(){
    super();
    this.state = {date: new Date()};
    this.tick = this.tick.bind(this)
  }
  
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({date: new Date()});
  }

  render(){
    return(
    <div> 
      <h1> Time </h1>
        <h2 className="klawk"> 
          {this.state.date.getHours()}:
          {this.state.date.getMinutes()}:
          {this.state.date.getSeconds()}
        </h2>
      <h1> Date </h1>
        <h2 className="klawk">
          {this.state.date.getDay()}:
          {this.state.date.getDate()}:
          {this.state.date.getFullYear()}
        </h2>
    </div>
    )
  }
}