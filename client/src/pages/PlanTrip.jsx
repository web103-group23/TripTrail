import React, { useState } from 'react';
import '../App.css';
import '../css/PlanTrip.css';
import invite_people_icon from '../assets/invite_people_icon.png';
import add_destination from '../assets/add_destination.png';

const PlanTrip = () => {
    const [trip, setTrip] = useState({
        id: 0,
        title: "",
        description: "",
        num_days: 0,
        from_loc: "",
        to_loc: "",
        start_date: "",
        end_date: "",
        total_cost: 0.0
    });
    const [attractions, setAttractions] = useState([]);
    const [directionsData, setDirectionsData] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTrip((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchAttractions = async () => {
        if (!trip.from_loc || !trip.to_loc) return;

        try {
            const directionsResponse = await fetch(
                `http://localhost:3001/api/directions?origin=${encodeURIComponent(trip.from_loc)}&destination=${encodeURIComponent(trip.to_loc)}`
            );
            const directionsData = await directionsResponse.json();
            setAttractions(directionsData.places);
        } catch (error) {
            console.error("Error fetching attractions:", error);
        }
    };

    const createTrip = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trip)
        };

        await fetch('/api/trips', options);
        window.location.href = '/';
    };

    const resetTrip = (event) => {
        event.preventDefault();
        setTrip({
            id: 0,
            title: "",
            description: "",
            num_days: 0,
            from_loc: "",
            to_loc: "",
            start_date: "",
            end_date: "",
            total_cost: 0.0
        });
    };

    return (
        <div className='plan_trip'>
            <div className='plan-trip-ribbon'>
                <div className="plan-trip-ribbon-title">
                    <div className="title1"><h4>Plan your</h4></div>
                    <div className='subtitle1'><h4>Trip</h4></div>
                </div>
                <div className='icons'>
                    <img src={invite_people_icon} alt="Invite Icon" />
                </div>
            </div>
            <table className='form-table'>
                <tbody>
                    <tr>
                        <td><label className="form-label">Title:</label></td>
                        <td><input type='text' name='title' placeholder='Up to 50 Characters' className='inputCustomSize1' value={trip.title} onChange={handleChange} /></td>
                        <td><label className="form-label">Description:</label></td>
                        <td><input type='text' name='description' placeholder='Up to 200 Characters' className='inputCustomSize2' value={trip.description} onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <table className='form-table1'>
                <tbody>
                    <tr>
                        <td><label className="form-label">Start Point:</label></td>
                        <td><input type='text' name='from_loc' placeholder='Enter start point' value={trip.from_loc} onChange={handleChange} onBlur={fetchAttractions} className='inputCustomSize1' /></td>
                        <td><label className="form-label">End Point:</label></td>
                        <td><input type='text' name='to_loc' placeholder='Enter end point' value={trip.to_loc} onChange={handleChange} onBlur={fetchAttractions} className='inputCustomSize1' /></td>
                        <td><label className="form-label">Duration:</label></td>
                        <td><input type='number' name='num_days' placeholder='Days' className='inputCustomSize1' value={trip.num_days} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td><label className="form-label">Start Date:</label></td>
                        <td><input type='date' name='start_date' className='inputCustomSize1' value={trip.start_date} onChange={handleChange} /></td>
                        <td><label className="form-label">End Date:</label></td>
                        <td><input type='date' name='end_date' className='inputCustomSize1' value={trip.end_date} onChange={handleChange} /></td>
                        <td><label className="form-label">Mode of Transport:</label></td>
                        <td>
                            <div className="radio-container">
                                <input type="radio" id="flight" name="transport" value="Flight" onChange={handleChange} />
                                <label className="form-label" htmlFor="flight">Flight</label>
                                <input type="radio" id="car" name="transport" value="Car" onChange={handleChange} />
                                <label className="form-label" htmlFor="car">Car</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label className="form-label">Chosen Destination:</label></td>
                        <td><input type='text' placeholder='Enter chosen destination' className='inputCustomSize1' /></td>
                        <td><label className="form-label">Time to Spend:</label></td>
                        <td><input type='text' placeholder='HH:MM' className='inputCustomSize1' /></td>
                        <td><label className="form-label">Budget:</label></td>
                        <td>
                            <select className='inputCustomSize2'>
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                                <option value='INR'>INR</option>
                            </select>
                            <input type="number" name="total_cost" className='inputCustomSize1' value={trip.total_cost} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='6' style={{ textAlign: 'center' }}>
                            <button type='submit' onClick={createTrip}>Submit</button>
                            <button type='button' onClick={resetTrip}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PlanTrip;
