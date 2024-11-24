import '../App.css';
import '../css/Home.css';
import Main_Page from '../assets/Main_Page.jpg';

const Home = () => {
    return (
        <div className="home">
            <div className="container-main">
                <div className="container-text">
                    <div className="title1">
                        <h4>Plan</h4>
                    </div>
                    <div className="title1">
                        <h4>Your</h4>
                    </div>
                    <div className="subtitle">
                        <h4>perfect</h4>
                    </div>
                    <div className="title1">
                        <h4>Gateway!</h4>
                    </div>
                </div>
                <div className="container-button">
                    <a href="/destinations" role="button">
                        Discover
                    </a>
                </div>
            </div>
            <div className="main_page_pic">
                <img src={Main_Page} alt="Main" />
            </div>
            <div className="container">
                <h1>
                    How does <span className="highlight">TripTrail</span> Work?
                </h1>
                <div className="steps-container">
                    <div className="step">
                        <div className="icon">🗓</div>
                        <h2>Plan a Trip</h2>
                        <ul>
                            <li>Discover Attractions</li>
                            <li>Add Destinations</li>
                            <li>Create Timelines</li>
                            <li>Set Budgets</li>
                            <li>Invite Friends</li>
                        </ul>
                    </div>
                    <div className="step">
                        <div className="icon">🗂️</div>
                        <h2>Stay Organized</h2>
                        <ul>
                            <li>Upload Documents</li>
                            <li>Set Reminders</li>
                            <li>Share Itinerary</li>
                        </ul>
                    </div>
                    <div className="step">
                        <div className="icon">🏃</div>
                        <h2>Track & Enjoy</h2>
                        <ul>
                            <li>Monitor Activities</li>
                            <li>Track Expenses</li>
                            <li>Notify About Split</li>
                            <li>Review Journey</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
