// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";
// import SongList from "../components/SongList/SongList";
// import { getRecentlyPlayed } from "../utils/storage";

// const RecentlyPlayed = ({ playSong, toggleSidebar }) => {
//   const [recentlyPlayed, setRecentlyPlayed] = useState([]);

//   useEffect(() => {
//     setRecentlyPlayed(getRecentlyPlayed());

//     // Check for updates frequently
//     const interval = setInterval(() => {
//       setRecentlyPlayed(getRecentlyPlayed());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Container fluid className="page-container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Recently Played</h1>
//         <button className="d-md-none btn btn-link" onClick={toggleSidebar}>
//           <FaBars />
//         </button>
//       </div>

//       {recentlyPlayed.length > 0 ? (
//         <SongList songs={recentlyPlayed} playSong={playSong} />
//       ) : (
//         <p>No recently played songs. Start playing some music!</p>
//       )}
//     </Container>
//   );
// };

// export default RecentlyPlayed;
