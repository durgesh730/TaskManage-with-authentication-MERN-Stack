import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const port = "http://localhost:5000"
    const [otp, setOtp] = useState({})
    const [pass, setPass] = useState({ password: "", cpassword: "" })
    const localOtp = localStorage.getItem("otp");
    const [isActive, setActive] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const setval = (e) => {
        const { name, value } = e.target

        setOtp(() => {
            return {
                ...otp,
                [name]: value
            }
        })
    }
    const setval2 = (e) => {
        const { name, value } = e.target
        setPass(() => {
            return {
                ...pass,
                [name]: value
            }
        })
    }

    const handlesubmit = () => {
        if (localOtp === otp.otp) {
            setActive(true)
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        const { password, cpassword } = pass;
        const data = await fetch(`${port}/resetPasword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: location.state?.data, password })
        })
        const res = await data.json()
        if (res.status == 201) {
            navigate('/');
        }
    }

    return (
        <>
            {
                !isActive ?
                    <>
                        <div style={{ width: "30%", margin: "auto", marginTop: "15rem", padding: ".2rem .3rem" }}  >
                            <h3>Enter Your OTP</h3>
                        </div>
                        <div className="pass" style={{ width: "30%", border: "1px solid black", margin: "auto", padding: ".2rem .3rem" }} >
                            <input type="number" placeholder="OTP" name='otp' value={otp.otp} onChange={setval} />
                        </div>
                        <div style={{ width: "30%", margin: "auto", marginTop: "1rem" }}  >
                            <button style={{ background: "black", padding: ".5rem 2rem", color: "white", borderRadius: ".3rem" }} onClick={handlesubmit} >Sign Up</button>
                        </div>

                    </>
                    :
                    <>
                        <div style={{ width: "30%", margin: "auto", marginTop: "15rem", padding: ".2rem .3rem" }}  >
                            <h3>Enter New Password</h3>
                        </div>
                        <div className="pass" style={{ width: "30%", margin: "auto", padding: ".2rem .3rem" }} >
                            <input style={{ border: "1px solid black" }} type="password" placeholder="Password" name='password' value={pass.password} onChange={setval2} />
                            <input style={{ border: "1px solid black", marginTop: "1rem" }} type="password" placeholder="Confirm Password" name='cpassword' value={pass.cpassword} onChange={setval2} />
                        </div>
                        <div style={{ width: "30%", margin: "auto", marginTop: "1rem" }}  >
                            <button style={{ background: "black", padding: ".5rem 2rem", color: "white", borderRadius: ".3rem" }} onClick={handlePassword} >Submit</button>
                        </div>
                    </>
            }
        </>
    );
};

export default ResetPassword;