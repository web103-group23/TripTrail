import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import DocumentBtn from '../components/DocumentBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css'

const TripDetails = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 })
    const [documents, setDocuments] = useState([])
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        if (!data || data.length === 0) return;
        const result = data.find((item) => item.id === parseInt(id));
        if (result) {
            setPost({id: parseInt(result.id), title: result.title, description: result.description, img_url: result.img_url, num_days: parseInt(result.num_days), start_date: result.start_date.slice(0,10), end_date: result.end_date.slice(0,10), total_cost: result.total_cost});
        }
        const fetchDocuments = async () => {
            const response = await fetch('/api/documents/' + id)
            const data = await response.json()
            setDocuments(data)
        }
          
        const fetchDestinations = async () => {
            const response = await fetch('/api/trips-destinations/destinations/' + id)
            const data = await response.json()
            setDestinations(data)
          }

        fetchDocuments();
        fetchDestinations();

    }, [data, id]);

    if (!post) {
        return <p>Loading trip details...</p>; // Handle the case when the trip is not found or still loading
    }

    return (
        <div className="TripDetails">
            <div className="flex-container">

                <div className="left-side">
                    <h3>{post.title}</h3>
                    <p>{"🗓️ Duration: " + post.num_days + " days "}</p>
                    <p>{"🛫 Depart: " + post.start_date }</p>
                    <p>{"🛬 Return: " + post.end_date}</p>
                    <p>{post.description}</p>
                </div>

                <div className="right-side" style={{ backgroundImage:`url(${post.img_url})`}}>
                </div>
            </div>

            <div className="flex-container">
                <div className="documents">
                {
                documents && documents.length > 0 ?
                documents.map((document,index) => 
                    <DocumentBtn id={document.id} document={document.document}/>
                ) : ''
                }
                    <br/>
                    <Link to={'../../document/create/'+ id }><button className="addDocumentBtn">+ Add Document</button></Link>
                </div>
                <div className="destinations">
                {
                destinations && destinations.length > 0 ?
                destinations.map((destination,index) => 
                    <DestinationBtn id={destination.id} destination={destination.destination} />
                ) : ''
                }
                    <br/>
                    <Link to={'../../destination/new/'+id}><button className="addDestinationBtn">+ Add Destination</button></Link>
                </div>
            </div>
        </div>
            


    )
}

export default TripDetails