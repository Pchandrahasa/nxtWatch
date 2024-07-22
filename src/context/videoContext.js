import React from "react";

const videoContext = React.createContext({
  videoItem: [],
  addVideoItem: () => {},
});

export default videoContext;
