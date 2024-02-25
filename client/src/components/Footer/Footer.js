import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { GrYoutube } from 'react-icons/gr'
import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='text-center my-4'><span>Task Manager</span></div>
                <div className='footer_socials_MainPage'>
                    <a href="https://www.linkedin.com/in/durgesh-chaudhary-535a76211/" target="_blank"><BsLinkedin /></a>
                    <a href="https://www.instagram.com/_durgesh.chaudhary/" target="_blank"><FiInstagram /></a>
                    <a href="https://www.youtube.com/@nanochat" target="_blank"><GrYoutube /></a>
                    <a href="https://www.youtube.com/@nanochat" target="_blank"><FaTwitter /></a>
                </div>
                <div className="line"></div>
                <div className='footerline'><hr />
                    <small>Copywrite @ Durgesh Chaudhary </small>
                </div>
            </div>

        </>
    )
}

export default Footer
