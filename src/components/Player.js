import React, { useState, useRef } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaPause,
  FaPlay,
  FaRandom,
  FaStepBackward,
  FaStepForward,
  FaSyncAlt,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
} from "react-icons/fa";
import "../scss/Player.scss";

const Player = ({ currentSong, favorites, toggleFavorite }) => {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // UI state
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // 'off', 'repeat-all', 'repeat-one'
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // References
  const audioRef = useRef(null);

  // Check if current song is in favorites
  const isFavorite =
    currentSong && favorites.some((fav) => fav.id === currentSong.id);

  // Calculate progress percentage for the progress bar
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle timeline seek
  const dragHandler = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // Handle volume change
  const changeVolume = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (volume > 0) {
      // Store current volume and set to 0
      audioRef.current.dataset.previousVolume = volume;
      changeVolume(0);
    } else {
      // Restore previous volume
      const previousVolume = parseFloat(
        audioRef.current.dataset.previousVolume || 0.7
      );
      changeVolume(previousVolume);
    }
  };

  // Get appropriate volume icon based on current volume
  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  // Format time to MM:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Toggle repeat mode: off -> repeat-all -> repeat-one -> off
  const cycleRepeatMode = () => {
    if (repeatMode === "off") setRepeatMode("repeat-all");
    else if (repeatMode === "repeat-all") setRepeatMode("repeat-one");
    else setRepeatMode("off");
  };

  // Placeholder functions for next/previous (would connect to audio context)
  const playNextSong = () => {
    console.log("Play next song");
  };

  const playPreviousSong = () => {
    console.log("Play previous song");
  };

  return (
    <div className="player">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={playNextSong}
      />

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={dragHandler}
            className="progress-slider"
          />
        </div>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player controls */}
      <div className="player-controls">
        {/* Left side controls */}
        <div className="player-song-controls">
          <div className="shuffle-control">
            <button
              className={`shuffle-button ${shuffle ? "is-shuffled" : ""}`}
              onClick={() => setShuffle(!shuffle)}
              title="Toggle Shuffle"
              aria-label="Toggle Shuffle"
              disabled={!currentSong}
            >
              <FaRandom className="shuffle-icon" />
            </button>
          </div>

          <div className="favorite-control">
            <button
              className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
              onClick={() => currentSong && toggleFavorite(currentSong)}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              disabled={!currentSong}
            >
              {isFavorite ? (
                <FaHeart className="favorite-icon filled" />
              ) : (
                <FaRegHeart className="favorite-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Center controls */}
        <div className="player-main-controls">
          <FaStepBackward className="control-icon" onClick={playPreviousSong} />
          <div className="play-button" onClick={togglePlay}>
            {isPlaying ? (
              <FaPause className="play-icon" />
            ) : (
              <FaPlay className="play-icon" />
            )}
          </div>
          <FaStepForward className="control-icon" onClick={playNextSong} />
        </div>

        {/* Right side controls */}
        <div className="right-controls">
          <div
            className="volume-control"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <div className="control-wrapper" onClick={toggleMute}>
              <span className="control-icon volume-icon">
                {getVolumeIcon()}
              </span>
            </div>

            {showVolumeSlider && (
              <div className="volume-slider-container">
                <div className="volume-track">
                  <div
                    className="volume-fill"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="repeat-control">
            <button
              className={`repeat-button ${repeatMode}`}
              onClick={cycleRepeatMode}
              title="Toggle Repeat"
              aria-label="Toggle Repeat"
            >
              {repeatMode === "repeat-one" ? (
                <span className="repeat-icon">
                  <FaSyncAlt />
                  <span className="repeat-one-indicator">1</span>
                </span>
              ) : (
                <span className="repeat-icon">
                  <FaSyncAlt />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
