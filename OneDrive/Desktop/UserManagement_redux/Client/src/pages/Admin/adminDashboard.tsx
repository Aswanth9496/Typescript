import { useNavigate } from "react-router-dom";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./adminDashboard.css";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  gender?: string;
  isAdmin: boolean;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUserData, setEditedUserData] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ users: User[] }>(
          "http://localhost:5000/api/admin/userDetails",
          { withCredentials: true }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user._id);
    setEditedUserData(user); // 
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setEditedUserData({ ...editedUserData, [field]: e.target.value });
  };

  const handleSave = async () => {
    if (!editingUserId) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/updateUser/${editingUserId}`,
        editedUserData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUsers(users.map(user => (user._id === editingUserId ? { ...user, ...editedUserData } : user)));
        Swal.fire("Updated!", "User details updated successfully.", "success");
        setEditingUserId(null);
        setEditedUserData({});
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId: string, userEmail: string) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/admin/deleteUser", {
        data: { email: userEmail },
        withCredentials: true,
      });

      if (response.data.success) {
        setUsers(users.filter(user => user._id !== userId));
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li>
            <FiUsers /> User List
          </li>
          <li className="logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <header>
          <h1>Dashboard</h1>
        </header>
        <section className="content">
          <div className="dashboard-overview">
            <p>Welcome to the Admin Dashboard</p>
          </div>
          <div className="user-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={editedUserData.name || ""}
                            onChange={e => handleChange(e, "name")}
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={editedUserData.email || ""}
                            onChange={e => handleChange(e, "email")}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={editedUserData.mobile || ""}
                            onChange={e => handleChange(e, "mobile")}
                          />
                        ) : (
                          user.mobile || "N/A"
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={editedUserData.gender || ""}
                            onChange={e => handleChange(e, "gender")}
                          />
                        ) : (
                          user.gender || "N/A"
                        )}
                      </td>
                      <td className={user.isAdmin ? "admin-badge" : "user-badge"}>
                        {user.isAdmin ? "Admin" : "User"}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <>
                            <button className="save" onClick={handleSave}>Save</button>
                            <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(user._id, user.email)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="no-data">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
