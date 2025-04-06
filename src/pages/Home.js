// import React, { useState } from "react";
// import { Container, Form, InputGroup } from "react-bootstrap";
// import { FaSearch, FaBars } from "react-icons/fa";
// import SongList from "../components/SongList/SongList";

// const Home = ({ songs, playSong, toggleSidebar }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredSongs = songs.filter((song) =>
//     song.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container fluid className="page-container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>For You</h1>
//         <button className="d-md-none btn btn-link" onClick={toggleSidebar}>
//           <FaBars />
//         </button>
//       </div>

//       <Form className="mb-4">
//         <InputGroup>
//           <InputGroup.Text>
//             <FaSearch />
//           </InputGroup.Text>
//           <Form.Control
//             placeholder="Search Song, Artist"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>
//       </Form>

//       <SongList songs={filteredSongs} playSong={playSong} />
//     </Container>
//   );
// };

// export default Home;
