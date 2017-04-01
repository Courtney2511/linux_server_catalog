import React from 'react'
import '../styles/main.scss'
import { Link } from 'react-router'


export default function MainNavigation() {

  return (
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
)}
