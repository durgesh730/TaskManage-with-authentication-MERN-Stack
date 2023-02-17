import React, { useEffect, useState } from 'react'
import '../components/Navbar.css'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import pic from "../image/hero-banner.png"


const Navbar = () => {

    const port = "http://localhost:5000"

    const [user, setUser] = useState()
    const [isActive, setActive] = useState("false");
    const open = () => {
        setActive(!isActive);
    };

    const handleUsers = async () => {
        const data = await fetch(`${port}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
        const json = await data.json()
        setUser(json)
        console.log(json)
    }

    useEffect(() => {
        handleUsers()
    }, [setUser])

    return (
        <>
            <header>
                <div class="container">
                    <a href="#" class="logo">
                        <span><FaAngleDoubleRight/>STICKY </span>
                    </a>
                
                    <div class="navbar-wrapper">

                        <button class="navbar-menu-btn" onClick={open}>
                            <GiHamburgerMenu />
                        </button>

                        <nav className={isActive ? "navbar" : " navbar  active"}>
                            <ul class="navbar-list align-center " >
                                <li class="nav-item d-flex  flex-row align-items-center ">
                                    <a href="" class="nav-link" style={{fontSize:"2.5rem", color:" hsl(2, 100%, 69%)" }} ><BsFillPersonFill/></a>
                                    {user?.map((item)=>{
                                        return(                                           
                                            <a href="#home" class="nav-link" style={{fontSize:"1rem", paddingTop:"1rem" }} > Hii {item.name} </a>
                                        )
                                    })}
                                </li>
                            </ul>
                            <button class="btn">Get in touch</button>
                        </nav>
                    </div>
                </div>
            </header>
            <main>

                <article>

                    <section class="hero" id="home">
                        <div class="container">

                            <div class="hero-content">

                                <h1 class="h1 hero-title">Write your first draft with your heart</h1>

                                <p class="hero-text">
                                    Capture and retrieve your lists across devices to help you stay organized at work, home, and on the go.
                                </p>

                                <button class="btn">Get started</button>

                            </div>

                            <div class="hero-banner"></div>

                        </div>

                        <div  className='images '>
                        <img src={pic} alt="shape" class="shape-content" />
                        </div>
                    </section>

                </article>
            </main>


        </>
    )
}

export default Navbar
