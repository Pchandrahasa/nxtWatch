import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Trending from './components/Trending';
import Gaming from './components/Gaming';
import VideoCardItem from './components/videoItemDetails';
import Saved from './components/Saved';

import VideoContext from './context/videoContext';

const App = () => {
  const [videoItem, setVideoItem] = useState([]);

  const addVideoItem = (item) => {
    setVideoItem([...videoItem, item]);
  };

  console.log('Current videoItem:', videoItem); 

  return (
    <Router>
      <VideoContext.Provider value={{ videoItem, addVideoItem }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/videoCardItem/:id" element={<VideoCardItem />} />
          <Route path="/saved" element={<Saved />} />

        </Routes>
      </VideoContext.Provider>
    </Router>
  );
};

export default App;
