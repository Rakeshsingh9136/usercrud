import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../services/userService';

function UserList({ users, setUsers }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (!isConfirmed) return;

    setIsDeleting(true);
    try {
      await deleteUser(id); // Delete the user from the API
      setUsers(users.filter((user) => user._id !== id)); // Remove the user from the list
    } catch (error) {
      alert('Error deleting user');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user._id}`); // Navigate to the EditUser page
  };

  return (
    <div style={{ margin: "48px", padding: "12px 8px", background: "lightgray" }}>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ display: "flex", margin: "12px", padding: "2px", background: "white", textAlign: "center" }}>
            <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" width="50" height="50" style={{ margin: "4px",borderRadius:"50%"}} />
            <p style={{ margin: "16px" }}>{user.name}</p>
            <p style={{ margin: "16px" }}>{user.email}</p>
            <p style={{ margin: "16px" }}>{user.phone}</p>
            <button onClick={() => handleDelete(user._id)} disabled={isDeleting} style={{ margin: "4px" }}>
              {isDeleting ? 'Deleting...' : 'Delete'}
             </button>
            <button style={{ margin: "4px" }} onClick={() => handleEdit(user)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
