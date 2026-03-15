import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { firebaseAuth } from "../utils/firebase-config";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    const { email, password } = formValues;

    if (!email) return setError("Email is required.");
    if (showPassword && !password) return setError("Password is required for signup.");

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email format.",
        "auth/weak-password": "Password should be at least 6 characters.",
      };
      setError(
        errorMessages[error.code] || "Failed to create account. Try again."
      );
    }
  };

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="email"
                value={formValues.email}
              />
              {!showPassword && error && <div className="error">{error}</div>}
            </div>
            {showPassword && (
              <div className="input-group password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="password"
                  value={formValues.password}
                />
                <span
                  className="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                {showPassword && error && <div className="error">{error}</div>}
              </div>
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
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
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        .input-group {
          position: relative;
          width: 100%;
          input {
            width: 100%;
            color: black;
            border: none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            box-sizing: border-box;
            &:focus {
              outline: none;
            }
          }
          .error {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #e87c03;
            color: white;
            padding: 0.5rem 0.8rem;
            border-radius: 4px;
            font-size: 0.85rem;
            margin-top: 6px;
            text-align: left;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            
            &::after {
              content: "";
              position: absolute;
              bottom: 100%;
              left: 15px;
              border-width: 6px;
              border-style: solid;
              border-color: transparent transparent #e87c03 transparent;
            }
          }
        }
        .password-container {
          position: relative;
          display: flex;
          align-items: center;
          input {
            padding-right: 3rem;
          }
          .icon {
            position: absolute;
            right: 1rem;
            cursor: pointer;
            font-size: 1.2rem;
            color: gray;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
