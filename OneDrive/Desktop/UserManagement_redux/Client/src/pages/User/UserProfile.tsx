import { useEffect, useState } from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    profileImage: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
console.log(storedUser)


    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        console.log("No file selected");
        return;
      }
  
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "User_management"); // Fix typo here
      data.append("cloud_name", "dgjfgnsw0");
  
      // Upload to Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/dgjfgnsw0/image/upload", {
        method: "POST",
        body: data,
      });
  
      const result = await response.json();
      if (!result.secure_url) throw new Error("Image upload failed");
  
      console.log("Uploaded Image URL:", result.secure_url);
  
      // Update UI & LocalStorage
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, profileImage: result.secure_url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <div className="profile-navbar">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Profile Section */}
      <div className="profile-container">
        {/* Profile Picture Upload */}
        <div className="image_container">
          <input type="file" accept="image/*" id="fileInput" onChange={handleImageUpload} />
          <label htmlFor="fileInput" className="image-upload-button">
            <img src={user.profileImage || "./pic/images (4).png"} alt="Profile" />
          </label>
        </div>

        {/* Profile Information */}
        <div className="profile_information">
          <ul>
            <li>
              <span>Name:</span>
              {isEditing ? (
                <input className="edit-input" type="text" name="name" value={user.name} onChange={handleChange} />
              ) : (
                user.name
              )}
            </li>
            <li>
              <span>Email:</span> {user.email} {/* Non-editable */}
            </li>
            <li>
              <span>Mobile:</span>
              {isEditing ? (
                <input className="edit-input" type="text" name="mobile" value={user.mobile} onChange={handleChange} />
              ) : (
                user.mobile
              )}
            </li>
            <li>
              <span>Gender:</span>
              {isEditing ? (
                <select className="edit-select" name="gender" value={user.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                user.gender
              )}
            </li>
          </ul>

          {/* Buttons */}
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
