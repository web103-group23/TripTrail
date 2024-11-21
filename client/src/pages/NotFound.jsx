import '../App.css';
import './Home.css';

const NotFound = () => {

    return (
        <div className='home'>
            <div className='container-main'>
                    <div className='container-text'>
                        <div className="title"><h4>404 Error</h4></div>
                        <div className='subtitle'><h4>Not Found</h4></div>
                    </div>
                    <div className='container-button'>
                    <a href='/' role='button'>Back to Home</a>
                    </div>
                </div>
        </div>
    );
};

export default NotFound;