import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import "./UserLogin.css";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";



const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setErrorMessage("");

      if (!email || !password) {
        setErrorMessage("Please enter both email and password.");
        return;
      }

      const response = await loginUser({ email, password });

      if (response.data.success) {
        setErrorMessage("");
        localStorage.setItem("user", JSON.stringify(response.data.user));
    
        if (response.data.user?.isAdmin) {
          navigate("/adminDashboard");
        } else {
          navigate("/userProfile");
        }
      } else {
        setErrorMessage(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <section className="login-container">
        <div className="login-card">
          <div className="welcome-message">
            <h1>Welcome Back!</h1>
            <p>Please sign in to continue</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          {/* Use form tag for proper submission */}
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="forgot-password">
              <span>Forgot Password?</span>
            </div>

            {/* Change button type to submit */}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/userRegister")}>Create one</span>
          </p>

          <div className="divider">
            <span>Or sign in with</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <FaGoogle  />
            </button>
            <button className="social-btn linkedin">
              <FaLinkedin  />
            </button>
            <button className="social-btn github">
              <FaGithub  />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLogin;
