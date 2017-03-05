import React from 'react'
import '../styles/main.scss'


export default class MainLayout extends React.Component {

  render() {
    return (
      <header>
        <div className="page-title">
          <h1 className="title">PHOTOBOMB</h1>
        </div>
        <nav>
          <ul className="nav-bar">
            <li className="nav-item"><a href="#">ALL</a></li>
            <li className="nav-item"><a href="#">ANIMALS</a></li>
            <li className="nav-item"><a href="#">BLACK &amp; WHITE</a></li>
            <li className="nav-item"><a href="#">LANDSCAPE</a></li>
            <li className="nav-item"><a href="#">PEOPLE</a></li>
            <li className="nav-item"><a href="#">FOOD</a></li>
          </ul>
        </nav>
        <main>
          {this.props.children}
        </main>
      </header>
    )
  }
}
