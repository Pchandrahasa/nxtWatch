import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import './index.css'

const Header = () => (
       <div className="header-container">
                <div className="header-logo-container">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        className="header-logo"
                        alt="watch-logo"
                    />
                </div>
                <div className="header-logout-container">
                    <MdOutlineDarkMode className="header-dark-mode" />
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                        className="header-profile"
                        alt="profile"
                    />
                    <button type="button" >
                        Logout
                    </button>
                </div>
            </div>
  )


export default Header
