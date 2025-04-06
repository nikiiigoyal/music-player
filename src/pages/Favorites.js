// import React, { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";
// import SongList from "../components/SongList/SongList";
// import { getFavorites } from "../utils/storage";

// const Favorites = ({ playSong, toggleSidebar }) => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     setFavorites(getFavorites());

//     // Add event listener for storage changes
//     const handleStorageChange = () => {
//       setFavorites(getFavorites());
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <Container fluid className="page-container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Favorites</h1>
//         <button className="d-md-none btn btn-link" onClick={toggleSidebar}>
//           <FaBars />
//         </button>
//       </div>

//       {favorites.length > 0 ? (
//         <SongList songs={favorites} playSong={playSong} />
//       ) : (
//         <p>
//           No favorite songs yet. Add some by clicking the options menu on a
//           song.
//         </p>
//       )}
//     </Container>
//   );
// };

// export default Favorites;
