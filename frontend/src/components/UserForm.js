import React, { useState } from 'react';
import { createUser, updateUser } from '../services/userService';

function UserForm({ user = null, setUsers }) {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      if (user) {
        // If user exists, update it
        const updatedUser = await updateUser(user._id, formData);
        setUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
      } else {
        // If no user, create a new one
        const newUser = await createUser(formData);
        setUsers((prev) => [...prev, newUser]);
      }
      setName('');
      setEmail('');
      setPhone('');
      setProfileImage(null);
    } catch (error) {
      console.error('Error while saving user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="file"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <button type="submit">Save User</button>
    </form>
  );
}

export default UserForm;
