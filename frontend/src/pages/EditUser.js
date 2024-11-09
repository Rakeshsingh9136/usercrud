import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, updateUser } from '../services/userService';

function EditUser() {
  const { id } = useParams(); // Get the user id from the URL
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the user data based on the id
        const response = await getUsers(); // Get the list of users
        const userData = response.data.find((user) => user._id === id); // Find the user by id
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        });
      } catch (error) {
        alert('Error fetching user details');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Update the user with the new data
      await updateUser(id, formData);
      alert('User updated successfully!');
      navigate('/'); // Navigate back to the user list
    } catch (error) {
      alert('Error updating user');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ margin: '48px', padding: '20px', background: 'lightgray' }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditUser;
