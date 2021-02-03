import React from 'react'

export class Tab extends React.Component {

  constructor(props){
    super(props);
    this.title = props.title;
    this.content = props.content;
    this.state = 0;
  }

  render() {
    
    return(
      <ul>
        <h1></h1>
        <article></article>
        <h1></h1>
        <article></article>
        <h1></h1>
        <article></article>
      </ul>
    )
  }
}