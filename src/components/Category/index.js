import React from 'react'
import {Link} from 'react-router-dom'
import { IoHome } from 'react-icons/io5';

import './index.css'

const Category = () => {
  return (
    <div className="category-container">
            <ul>
                <Link to="/home" className='category-link'>
                    <li>
                        <IoHome className='category'/> Home
                    </li>
                </Link>

                <Link to="/trending" className='category-link'>
                    <li>
                        <IoHome className='category'/> Trending
                    </li>
                </Link>

                <Link to="/gaming" className='category-link'>
                    <li>
                        <IoHome className='category'/> Gaming
                    </li>
                </Link>

                <Link to="/saved" className='category-link'>
                    <li>
                        <IoHome className='category'/> Saved videos
                    </li>
                </Link>

            </ul>
        <div className='bottom-section'>
            <h3>contact us</h3>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook" className='logo-social'/>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter" className='logo-social'/>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked" className='logo-social'/>
            <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
    </div>
      
  )
}

export default Category
