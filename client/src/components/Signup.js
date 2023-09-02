import React, { useState } from 'react'
import './signup.css'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const port = "http://localhost:5000"
  const navigate = useNavigate()

  const [reset, setReset] = useState(false);
  const [isActive, setActive] = useState("false");
  const open = () => {
    setActive(!isActive);
  };
  const [swapPanel, setSwapPanel] = useState(false);
  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  // for sign up
  const [getdata, setGetData] = useState({ email: "", password: "" })
  const setGet = (e) => {
    const { name, value } = e.target

    setGetData(() => {
      return {
        ...getdata,
        [name]: value
      }
    })
  }

  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [resetData, setResetData] = useState({ email: "" })
  const setval = (e) => {
    const { name, value } = e.target

    setData(() => {
      return {
        ...data,
        [name]: value
      }
    })
    setResetData(() => {
      return {
        ...getdata,
        [name]: value
      }
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data
    if (name === '') {
      alert('Your Name is Required')
    } else if (email === "") {
      alert('Your email is Required')
    } else if (!email.includes('@')) {
      alert("Please Enter valid email")
    } else {
      const data = await fetch(`${port}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      })
      const res = await data.json()
      if (res.status === 201) {
        setSwapPanel(false);
        alert('You are Registered successfully')
      } else {
        alert("Plz Enter correct Details")
      }
    }
  }

  const ResetPassword = async (e) => {
    e.preventDefault();
    const { email } = resetData;
    const data = await fetch(`${port}/generateOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
    const res = await data.json()
    localStorage.setItem("otp", res.code);

    let text = `Your Reset Password OTP ${res.code}`;
    let subject = "For Reset Password"

    const sendotptomail = await fetch(`${port}/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, text, subject })
    })
    const response = await sendotptomail.json()
    navigate('/resetpassword', { state: { data: resetData.email } })
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = getdata
    if (email === "") {
      alert('Your Email is Required')
    } else if (password === '') {
      alert('Your email is Required')
    } else {
      const data = await fetch(`${port}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const res = await data.json()
      if (res.status == 201) {
        localStorage.setItem("token", res.result.token);
        localStorage.setItem("login", JSON.stringify(res.result));
        navigate('/mainpage');
      } else {
        alert("Plz Enter correct Details")
      }
    }
  }

  return (
    <>

      <header>
        <div class="container">
          <a href="#" class="logo">
            <span><FaAngleDoubleRight />STICKY </span>
          </a>
          <div class="navbar-wrapper">
            <button class="navbar-menu-btn" onClick={open}>
              <GiHamburgerMenu />
            </button>
            <nav className={isActive ? "navbar" : " navbar  active"}>
              <button class="btn">Get in touch</button>
            </nav>
          </div>
        </div>
      </header>

      <div className='SignupLogin' >
        <div className={["container body ", swapPanel ? "right-panel-active" : null].filter(Boolean).join(" ")} id="container">

          <div class="form-container sign-up-container">
            <form>
              {!reset ?
                <>
                  <h3>Create Account</h3>
                  <span>Use your email for registration</span>
                  <input type="text" name='name' value={data.name} placeholder="Name" onChange={setval} />
                </>
                :
                ""
              }

              {reset ? <>
                <h3 className='my-4' >Reset Password</h3>
                <input type="email" placeholder="Email" name='email' value={resetData.email} onChange={setval} />
                <button className='my-4' onClick={ResetPassword} >Send OTP</button>
              </>
                : ""
              }

              {!reset ? <>
                <input type="email" placeholder="Email" name='email' value={data.email} onChange={setval} />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={setval} />
                <button onClick={handlesubmit} >Sign Up</button>

                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }} >
                  <span style={{ fontSize: "1rem" }} >Reset Your Password </span>
                  <a onClick={() => { setReset(true) }} style={{ color: 'blue', cursor: "pointer" }}  >click here</a>
                </div>
              </>
                :
                ""
              }

            </form>
          </div>

          <div class="form-container sign-in-container">
            <form>
              <h1>Login</h1>
              <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>

              <div>
                <input type="email" name='email' value={getdata.email} placeholder="Email" onChange={setGet} />
                <input type="password" name='password' value={getdata.password} placeholder="Password" onChange={setGet} />
              </div>

              <a href="#">Forgot your password?</a>
              <button onClick={handlelogin} >Login</button>
            </form>
          </div>

          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button class="ghost" onClick={signInButton} id="signIn">Login</button>
              </div>
              <div class="overlay-panel  overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button class="ghost" onClick={signUpButton} id="signUp">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
