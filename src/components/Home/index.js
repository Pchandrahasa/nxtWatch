import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'; 
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from '../header'
import Category from '../Category'

import './index.css'; 

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

const Home = () => {
    const [videoList, setVideos] = useState([]); 
    const [searchItem,setSearchItem]=useState('')
    const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial)

    const onChangeSearchItem=(event)=>{
        setSearchItem(event.target.value)
    }

    const filteredVideos = videoList.filter(video =>
        video.title.toLowerCase().includes(searchItem.toLowerCase())
      );


    useEffect(() => {
        const fetchData = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const url = 'https://apis.ccbp.in/videos/all';
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            };

            try {
                setApiStatus(apiStatusConstants.inProgress)
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const convertedData = data.videos.map(video => ({
                    id: video.id,
                    name: video.channel.name,
                    profileImageUrl: video.channel.profile_image_url,
                    publishedAt: video.published_at,
                    thumbnailUrl: video.thumbnail_url,
                    title: video.title,
                    viewCount: video.view_count,
                }));

                setVideos(convertedData);
                setApiStatus(apiStatusConstants.success)


            } catch (error) {
                console.error('Error fetching data:', error);
                setApiStatus(apiStatusConstants.failure)

            }
        };

        fetchData();
    }, []); 


    const videos=()=> {
        return <div className='videos-container'>
            {filteredVideos.map(video => (
                <Link to={`/videocarditem/${video.id}`} className='link'>
                <div key={video.id} className="video-item" value={video.id}>
                    <img src={video.thumbnailUrl} alt="" className="thumbnail-img" />
                    <h5>{video.title}</h5>
                    <p>{video.name}</p>
                    <p>Views: {video.viewCount}</p>
                    <p>{video.publishedAt} years ago</p>
                </div> 
                </Link>
            ))}
        </div>;
    }


  const VideoFailureView = () => (
    <div className='videos-failure-container'>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="Register Prime"
        className="video-failure-image"
    />
    <h1>No Data Found</h1>
    </div>
    
  )

  const renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  );



    return (
        <div className="home">
        <Header/>  
            <div className="middle-section">
            <Category />
            <div className='container'>
                <input type="search" className='search' placeholder='search' onChange={onChangeSearchItem}/>
                <div className="video-main-container">
                    <div className='banner'>
                        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" className='banner-watch'alt=""/>
                        <button type="button">Get In Now</button>
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    </div>
                    {apiStatus===apiStatusConstants.success && videos()  }
                    {apiStatus===apiStatusConstants.failure && VideoFailureView()}
                    {apiStatus===apiStatusConstants.inProgress && renderLoadingView() }    
                    </div>
                </div>
            </div>
        </div>

    );

};

export default Home;
