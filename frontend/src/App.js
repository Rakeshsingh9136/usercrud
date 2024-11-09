import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import UserPage from "./pages/UserPage.js";
import { useEffect, useState } from 'react';
import { getUsers } from './services/userService.js';
import EditUser from "./pages/EditUser.js";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data); // Store the fetched users
      } catch (error) {
        alert('Error fetching users');
      }
    };

    fetchUsers();
  }, []);
  return (
    <Router>
      <h1>Admin Dashboard</h1>
      <Routes>
        <Route path='/' element={<UserPage users={users} setUsers={setUsers} />}/>
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
