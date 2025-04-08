import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ activeTab, setActiveTab, onClose }) => {
  const handleTabSelect = (tabName) => {
    setActiveTab(tabName);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/public/spotifylogo.png" alt="logo" className=""></img>
        </div>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => handleTabSelect("forYou")}
        >
          For You
        </Nav.Link>
        <Nav.Link
          className={activeTab === "topTracks" ? "active" : ""}
          onClick={() => handleTabSelect("topTracks")}
        >
          Top Tracks
        </Nav.Link>
        <Nav.Link
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => handleTabSelect("favorites")}
        >
          Favourites
        </Nav.Link>
        <Nav.Link
          className={activeTab === "recentlyPlayed" ? "active" : ""}
          onClick={() => handleTabSelect("recentlyPlayed")}
        >
          Recently Played
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
