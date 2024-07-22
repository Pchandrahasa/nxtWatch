import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import ReactPlayer from 'react-player';
import { FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa'; // Importing icons
import Cookies from 'js-cookie';
import Header from '../header';
import Category from '../Category';
import './index.css';

import VideoContext from '../../context/videoContext';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Gaming = () => {
  const [videoList, setVideos] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { id } = useParams();
  const { addVideoItem } = useContext(VideoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const jwtToken = Cookies.get('jwt_token');
        const url = `https://apis.ccbp.in/videos/${id}`;
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const convertedData = {
          id: data.video_details.channel.id,
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          title: data.video_details.title,
          description: data.video_details.description,
          subscriberCount: data.video_details.channel.subscriber_count,
          publishedAt: data.video_details.published_at,
          videoUrl: data.video_details.video_url,
          viewCount: data.video_details.view_count,
        };

        setVideos(convertedData);
        setApiStatus(apiStatusConstants.success);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiStatus(apiStatusConstants.failure);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = () => {
    console.log('Liked!');
  };

  const handleDislike = () => {
    console.log('Disliked!');
  };

  const handleSave = () => {
    if (videoList) {
      addVideoItem(videoList);
    }
  };

  const videosSuccessView = () => (
    <div className='video-item-details'>
      <div style={{ width: '100%', height: '50vh' }}>
        <ReactPlayer
          url={videoList.videoUrl}
          width='100%'
          height='100%'
          controls
        />
      </div>
    <h2>{videoList.title}</h2>

    <div className='count-year-likebutton'>
      <div className='published-count'>
        <p>{videoList.publishedAt}</p>
        <p>{videoList.viewCount} views</p>
      </div>

      <div className='icon-container'>
        <button type="button" onClick={handleLike}>
          <FaThumbsUp className="icon"  title="Like" /> Like
        </button>
        <button type="button" onClick={handleDislike}>
          <FaThumbsDown className="icon"  title="Dislike" /> Dislike
        </button>
        <button type="button" onClick={handleSave}>
          <FaBookmark className="icon"  title="Save" /> Save
        </button>
      </div>
    </div>

   
    <hr/>

    <div className='video-subcriber-count'>
      <div>
        <p>{videoList.name}</p>
        <p>{videoList.subscriberCount} subscribers</p>
        <p>{videoList.description}</p>
      </div>
    </div>
    

   

    </div>
    
  );

  const VideoFailureView = () => (
    <div className='videos-failure-container'>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="No Data Found"
        className="video-failure-image"
      />
      <h1>No Data Found</h1>
    </div>
  );

  const renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  );

  return (
    <div className="home">
      <Header />  
      <div className="middle-section">
        <Category />
        <div className="video-main-container">
          {apiStatus === apiStatusConstants.success && videosSuccessView()}
          {apiStatus === apiStatusConstants.failure && VideoFailureView()}
          {apiStatus === apiStatusConstants.inProgress && renderLoadingView()}
        </div>
      </div>
    </div>
  );
};

export default Gaming;
