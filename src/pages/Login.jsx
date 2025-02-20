import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { firebaseAuth } from "../utils/firebase-config";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset errors before new attempt
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Logged in successfully!");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "Invalid email format.",
        "auth/user-not-found": "User not found. Please check your email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/user-disabled": "This account has been disabled.",
      };
      setError(errorMessages[error.code] || "An unexpected error occurred.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      setError("Failed to send reset email. Check if your email is correct.");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <div className="form-container">
          <div className="form">
            <h2>Sign In</h2>

            <div className="input-group">
              <input
                type="text"
                placeholder="Email or mobile number"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {error && <p className="error">{error}</p>}
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash color="#aaa" />
                ) : (
                  <FaEye color="#aaa" />
                )}
              </span>
            </div>

            <button className="signin-btn" onClick={handleLogin}>
              Sign In
            </button>

            <div className="extra-options">
              <button
                onClick={handleForgotPassword}
                className="forgot-password"
              >
                Forgot password?
              </button>
              <p className="signup-link">
                New to Netflix?{" "}
                <span onClick={() => navigate("/signup")}>Sign up now.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .form-container {
      background-color: rgba(0, 0, 0, 0.7);
      padding: 3rem;
      border-radius: 8px;
      width: 350px;
      text-align: left;
      color: white;

      .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .input-group {
          position: relative;
          input {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #444;
            background-color: #222;
            color: white;
            font-size: 1rem;
          }
          .error {
            color: #e50914;
            font-size: 0.85rem;
            margin-top: 5px;
            text-align: left;
          }
        }

        .password-group {
          display: flex;
          align-items: center;
          input {
            padding-right: 40px;
          }
          span {
            position: absolute;
            right: 12px;
            cursor: pointer;
          }
        }

        .signin-btn {
          padding: 12px;
          background-color: #e50914;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .extra-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;

          .forgot-password {
            background: none;
            border: none;
            color: #aaa;
            font-size: 0.9rem;
            cursor: pointer;
          }

          .signup-link {
            font-size: 0.9rem;
            span {
              color: white;
              font-weight: bold;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

export default Login;
