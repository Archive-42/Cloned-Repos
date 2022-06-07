import React from 'react';
import ReactDom from 'react-dom';
import Clock from './clock';

function Root(props){
  return (
    <div>
      <Clock />
    </div>
  )
}

document.addEventListener("DOMContentLoaded", () => {
  // debugger;
  const root = document.getElementById('root');
  ReactDom.render(<Root />, root)
});