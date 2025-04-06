import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
} from "react-icons/fa";
import "./Player.scss";

const Player = ({ song, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  console.log("hello");

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src={song.musicUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <Row className="align-items-center">
        <Col xs={3} className="song-info">
          <img src={song.thumbnail} alt={song.title} className="thumbnail" />
          <div>
            <h5>{song.title}</h5>
            <p>{song.artistName}</p>
          </div>
        </Col>

        <Col xs={6} className="controls">
          <div className="d-flex flex-column align-items-center">
            <div className="control-buttons">
              <Button variant="link" className="control-btn">
                <FaBackward />
              </Button>
              <Button variant="link" className="play-btn" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>
              <Button variant="link" className="control-btn">
                <FaForward />
              </Button>
            </div>

            <div className="progress-container">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                value={currentTime}
                max={duration || 0}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
                className="progress-bar"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </Col>

        <Col xs={3} className="volume">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
            }}
            defaultValue="0.5"
            className="volume-bar"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Player;
