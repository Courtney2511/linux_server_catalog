import React from 'react'
// import '../styles/common/reset.scss'
import '../styles/main.scss'
import { Link } from 'react-router'

export default class MainLayout extends React.Component {

  render() {
    return (
      <container>
      <header>
        <div className="main-header">
          <div className="header-left">
            <i className="fa fa-bomb fa-lg" aria-hidden="true"></i>
            <h1 className="title">PHOTOBOMB</h1>
          </div>
          <div className="header-right">
            <div className="log-in">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              <p>Log In</p>
            </div>
            <div className="sign-up">
              <i className="fa fa-user-o" aria-hidden="true"></i>
              <p>Sign Up</p>
            </div>
          </div>
        </div>
        <div className="navigation">
        <nav>
          <ul className="nav-bar">
            <li className="nav-item">
              <Link to={"/"}>ALL</Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories/1"}>ANIMALS</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories/2">BLACK &amp; WHITE</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories/3">LANDSCAPE</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories/4">PEOPLE</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories/5">FOOD</Link>
            </li>
          </ul>
        </nav>
      </div>
      </header>
      <main>
        {this.props.children}
      </main>
      </container>
    )
  }
}
