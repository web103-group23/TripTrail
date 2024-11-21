import React from 'react';
import './Destination.css'
const Destination = ({ name, onClick }) => {
    return (
        <div className="event" onClick={onClick}>
            <p>{name}</p>
        </div>
    );
};
export default Destination;