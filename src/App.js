import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Modal } from "./components/ui/modal";
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: "", user: null });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to add user");
      const user = await response.json();
      setUsers((prev) => [...prev, user]);
      setModal({ isOpen: false, type: "", user: null });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error("Failed to update user");
      const user = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      setModal({ isOpen: false, type: "", user: null });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = (type, user = null) => {
    setModal({ isOpen: true, type, user });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "", user: null });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      {error && <div className="text-red-500">Error: {error}</div>}
      <Button onClick={() => openModal("add")} className="mb-4">Add User</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.company?.name || "N/A"}</p>
                <div className="flex justify-between mt-2">
                  <Button size="sm" onClick={() => openModal("edit", user)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modal.isOpen && (
        <Modal isOpen={modal.isOpen} onClose={closeModal}>
          <UserForm
            type={modal.type}
            user={modal.user}
            onSave={(data) => {
              modal.type === "add" ? handleAddUser(data) : handleEditUser(data);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

const UserForm = ({ type, user, onSave }) => {
  const [formData, setFormData] = useState(user || { name: "", email: "", department: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="department"
        label="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <Button type="submit">{type === "add" ? "Add" : "Update"} User</Button>
    </form>
  );
};

export default App;
