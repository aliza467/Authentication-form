import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Tabs, Tab } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup,GithubAuthProvider  } from 'firebase/auth';
import auth from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function LoginSignupForm() {
  const navigate= useNavigate()
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true';
    const savedEmail = remembered ? localStorage.getItem('email') : '';
    setRememberMe(remembered);
    setEmail(savedEmail);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

   
    const { email, password } = loginData;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Logged in:", res);
      })
      .catch((err) => {
        console.error("Login error:", err);
      });

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
      }

      navigate('/dashboard');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up:", userCredential);
        // Save user data to localStorage
        const userObj = {
          name,
          email,
        };
        localStorage.setItem("userData", JSON.stringify(userObj));
        // navigate to another page if necessary
      })
      .catch((err) => {
        console.error("Signup error:", err);
      });
  };

  const handleGoogle=(e)=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleGithub=(e)=>{
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {activeTab === 0 && (
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              autoComplete="current-password"
            />
               <div>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
      </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
            >
              Login
            </Button>
            <Button style={{ fontSize: "10px", margin:"10px" }}  type="submit"
              variant="contained"
              color="primary"
               onClick={handleGoogle}>Login with Google</Button>
            <Button  type="submit"
              variant="contained"
              color="primary"
              style={{ fontSize: "10px" }} onClick={handleGithub}>Login with Github</Button>
          </form>
        )}

        {activeTab === 1 && (
          <form onSubmit={handleSignup}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={signupData.name}
              onChange={handleSignupChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={signupData.password}
              onChange={handleSignupChange}
              autoComplete="new-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              autoComplete="new-password"
            />
            <a href="">Already have an account?</a>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
            >
              Signup
            </Button>

            
          </form>
        )}
      </Paper>
    </Container>
  );
}

export default LoginSignupForm;