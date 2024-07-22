import React, {useContext } from 'react';

import videoContext from '../../context/videoContext'
import Header from '../header'
import Category from '../Category'

import './index.css'; 


const Saved = () => {
  const { videoItem } = useContext(videoContext);

  if (!videoItem) {
    return <div>Loading...</div>; 
  }

  const videos=()=> {
      return <div className='videos-container'>
          {videoItem.map(video => (
              <div key={video.id} className="video-item">
                  <img src={video.thumbnailUrl} alt="" className="saved-thumbnail-img" />
                  <h5>{video.title}</h5>
                  <p>Views: {video.viewCount}</p>
              </div>
          ))}
      </div>;
  }

    return (
        <div className="home">
        <Header/>  
            <div className="middle-section">
            <Category />
            <div className='conjtainer'>
                <input type="search" className='search' placeholder='search'/>
                    <div className="video-main-container">
                        <div className='banner'>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" className='banner-watch'alt=""/>
                            <button type='button'>Get In Now</button>
                            <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        </div>
                        {videos()}
                    </div>
                </div>
            </div>
        </div>

    );

};

export default Saved;
