import { FaGoogle, FaLinkedinIn, FaGithub } from "react-icons/fa";
import "./UserRegister.css";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password mismatch");
      return;
    }

    try {
     
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
       
      setMessage(response.data.message)
      setError(null);
      setFormData({ 
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
       
    } catch (error:any) {
      setError(error.response?.data?.message || "Registration failed!");
      setMessage(null);
    }
  };



  return (
    <div className="register-page">
      <section className="register-container">
        <div className="register-card">
          <div className="welcome-message">
            <h1>Create an Account</h1>
            <p>Sign up to get started</p>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>

        
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              value={formData.name}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              onChange={handleChange}
              value={formData.password}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              value={formData.confirmPassword}
            />

            {/* Button Type should be Submit */}
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="login-link">
  Already have an account? <span onClick={() => navigate('/')}>Sign in</span>
</p>


          <div className="divider">
            <span>Or sign up with</span>
          </div>

          <div className="social-register">
            <button className="social-btn google">
              <FaGoogle />
            </button>
            <button className="social-btn linkedin">
              <FaLinkedinIn />
            </button>
            <button className="social-btn github">
              <FaGithub />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserRegister;
