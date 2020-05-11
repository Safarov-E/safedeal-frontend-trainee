import React from 'react';
import Images from '../Images';
import './App.css';

export default class extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="logo">
          <h2>Test APP</h2>
        </div>
        <Images />
        <footer>
          <div className="line"></div>
          <div className="copyright">© 2018-2019</div>
        </footer>
      </div>
    )
  }
}