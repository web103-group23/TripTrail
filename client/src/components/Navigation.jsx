import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../css/Navigation.css";
import Logo from "../assets/Logo.png";
import email_icon from "../assets/email_icon.png";
import instagram_icon from "../assets/instagram_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";
import heart_icon from "../assets/heart_icon.png";
import profile_icon from "../assets/profile_icon.png";

const Navigation = () => {
    return (
        <div className="App">
            <div className="header">
                <div className="home_page">
                    <div className="ribbon">
                        <div className="icons">
                            <img src={instagram_icon} />
                            <div className="text">tripotrail_find_me</div>
                            <img src={whatsapp_icon} />
                            <div className="text">+1-404-987-999</div>
                            <img src={email_icon} />
                            <div className="text">support@tripotrail.com</div>
                        </div>
                    </div>
                    <div className="main_page">
                        <div className="logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <div className="nav-header">
                            <div className="nav-buttons">
                                <a href="/" role="button">
                                    Home
                                </a>
                                <Link to="/trip/new">Plan your Trip</Link>
                                <Link to="/trips">My Trips</Link>
                                <a href="/destinations" role="button">
                                    Destinations
                                </a>
                                <div className="nav-icons">
                                    <img src={heart_icon} />
                                    <img src={profile_icon} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
