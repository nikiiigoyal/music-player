import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FaEllipsisH, FaHeart } from "react-icons/fa";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../../utils/storage";
import "./SongList.scss";

const SongList = ({ songs, playSong }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  const handlePlaySong = (song, index) => {
    playSong(song);
    setActiveIndex(index);
  };

  const toggleOptions = (index, e) => {
    e.stopPropagation();
    setShowOptions(showOptions === index ? null : index);
  };

  const toggleFavorite = (song, e) => {
    e.stopPropagation();
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
    setShowOptions(null);
    // Force re-render
    setActiveIndex((prev) => prev);
  };

  return (
    <ListGroup className="song-list">
      {songs.map((song, index) => (
        <ListGroup.Item
          key={song.id}
          className={`song-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => handlePlaySong(song, index)}
        >
          <div className="song-details">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="song-thumbnail"
            />
            <div className="song-info">
              <h5>{song.title}</h5>
              <p>{song.artistName}</p>
            </div>
          </div>
          <div className="song-actions">
            <span className="duration">{song.duration}</span>
            <Button
              variant="link"
              className="options-btn"
              onClick={(e) => toggleOptions(index, e)}
            >
              <FaEllipsisH />
            </Button>
            {showOptions === index && (
              <div className="options-menu">
                <Button
                  variant="link"
                  onClick={(e) => toggleFavorite(song, e)}
                  className={isFavorite(song.id) ? "favorite" : ""}
                >
                  <FaHeart />{" "}
                  {isFavorite(song.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </Button>
              </div>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SongList;
