import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import emailSymbol from "./contactpages/images/email.jpg";
import locationSymbol from "./contactpages/images/location.jpg";
import messageSymbol from "./contactpages/images/message.jpg";
import phoneSymbol from "./contactpages/images/phone.jpg";
import "./HomePage.css";
import HeroSection from './HeroSection'; //Fetch the HeroSection 

function HomePage() {
    /* Collapsable text functions */
    const [showText1, setShowText1] = useState(false); 
    const [showText2, setShowText2] = useState(false); 
    const [showText3, setShowText3] = useState(false); 
    const [showText4, setShowText4] = useState(false); 
    const toggleText1 = () => {
        setShowText1(!showText1); 
    };
    const toggleText2 = () => {
        setShowText2(!showText2); 
    };
    const toggleText3 = () => {
        setShowText3(!showText3); 
    };
    const toggleText4 = () => {
        setShowText4(!showText4); 
    };

return (
    <>
        <div>
            <div className="wrap">
            {/* Header section */}
            <div className="banner">
                <h1>Happy Hounds</h1>
                <Link to="/login" className="login">Log in</Link>
            </div>
        
        {/* Adds in the HeroSection*/}
        <HeroSection /> 

        {/* Rest of the page */}
        <div className="content-container">
            {/* About us text box*/}
            <div className="text-box">
                <h2>
                    About us
                </h2>
            <p>Happy hounds is a site committed to providing a safe, easy and reliable platform for dog walkers and owners to meet and connect.</p>
            <p>Modern lifestyles sometimes can keep you from spending time with mans best friends. Luckily you aren't alone,
                we set out on a mission to help increase dog health by allowing members to quickly find trusted dog walkers.</p>
            </div>

            {/* The image of the dog on the mountair*/}
            <div className="image-box"></div>

            {/* The two boxes about dog owners and walkers */}
            <div className="vertical-text-box">
            <div className="vertical-text">
                <h2>Dog Owners</h2>
                <p>Join our passionate community of fellow dog lovers. We aim to provide a platform for you to be able to connect to trusted dog walkers.
                    We at happy hounds understand the stress of leaving your prized pooch with someone else. So we aim to efficiently partner you with an elite force of local friends.</p>
            </div>
            <div className="vertical-text">
                <h2>Dog walkers</h2>
                <p>Love Dogs? Hate being inside? Want to choose your own working hours? </p>
                <p>If your answer to all of those questions was yes, why don't you try an exciting new job oppurtunity.</p>
                <p>Join an elite force of trusted dog walkers and connect closely to local dogs. You can accept bookings, manage tasks and conect with clients.</p>
            </div>
            </div>
        </div>

        {/* row of icons */}
        <div className="icon-row">
            <div className="icon-container">
                {/* Map icon */}
                <div className="icon" id='icon1' onClick={toggleText1}></div>
                {showText1 && <p>Find local walkers</p>}
            </div>
            <div className="icon-container">
                {/* list icon */}
                <div className="icon" id='icon2' onClick={toggleText2}></div>
                {showText2 && <p>Set tasks</p>}
            </div>
            <div className="icon-container">
                {/* chat icon */}
                <div className="icon" id='icon3' onClick={toggleText3}></div>
                {showText3 && <p>Direct messaging</p>}
            </div>
            <div className="icon-container">
                {/* appointment icon */}
                <div className="icon" id='icon4' onClick={toggleText4}></div>
                {showText4 && <p>Book appointments</p>}
            </div>
            </div>
            <div className="text-box">
            <p>Additional information here</p>
            <p>There are currently</p>
            </div>
        </div>

        {/* Footer */}
        <div className="banner">
        <div className="contact-info">
            <h2>Contact Us:</h2>
            <p>email: happyhounds@outlook.com</p>
            <p>phone number: +44 07xxxxxxxxx</p>
        </div>
        </div>
        </div>
    </>
);
}
export default HomePage;