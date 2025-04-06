import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";
// import Home from "./pages/Home";
// import Favorites from "./pages/Favorites";
// import RecentlyPlayed from "./pages/RecentlyPlayed";
import { songs } from "./data/songs";
import "./styles/main.scss";
import SongList from "./components/SongsList/SongsList";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Handle background color change
  useEffect(() => {
    if (currentSong) {
      document.body.style.transition = "background-color 1s ease";
      document.body.style.backgroundColor = currentSong.backgroundColor;

      // Add to recently played
      addToRecentlyPlayed(currentSong);
    }
  }, [currentSong]);

  const addToRecentlyPlayed = (song) => {
    const recentlyPlayed =
      JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];

    // Remove song if it already exists
    const filteredList = recentlyPlayed.filter((item) => item.id !== song.id);

    // Add song to beginning of array
    const newList = [song, ...filteredList].slice(0, 10);

    sessionStorage.setItem("recentlyPlayed", JSON.stringify(newList));
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div className="app-container">
        {showSidebar && <Sidebar />}

        <div>
          <SongList songs={songs} playSong={playSong} />
        </div>

        <div className="content-container">
          {/* <Routes>
            <Route
              path="/"
              element={
                <Home
                  songs={songs}
                  playSong={playSong}
                  toggleSidebar={toggleSidebar}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites playSong={playSong} toggleSidebar={toggleSidebar} />
              }
            />
            <Route
              path="/recently-played"
              element={
                <RecentlyPlayed
                  playSong={playSong}
                  toggleSidebar={toggleSidebar}
                />
              }
            />
          </Routes> */}
        </div>

        {currentSong && (
          <Player
            song={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
