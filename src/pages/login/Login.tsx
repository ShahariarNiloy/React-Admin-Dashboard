import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginStyle.scss";
import { auth } from "../../firebase/firebaseConfig";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { currentUser, dispatch } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     dispatch({type:"LOGIN", payload:user})
    //
    //   })
    //   .catch((error) => {
    //     setError(true);
    //   });
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="email">
          <label htmlFor="emailInput">Email :</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
            required
            autoComplete="off"
          />
        </div>
        <div className="password">
          <label htmlFor="passwordInput">Password :</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
            required
            autoComplete="off"
          />
        </div>
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
