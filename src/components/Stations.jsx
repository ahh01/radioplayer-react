import React from "react";

const stations = ({ name, image, color, liveaudio }) => (
  <div className="station" style={{ backgroundColor: "#" + color }}>
    <div className="station-image">
      <img src={image} alt={name} />
    </div>

    <div className="station-info">
      <h2 className="station-name">{name}</h2>
      <audio controls>
        <source src={liveaudio.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
);
export default stations;
