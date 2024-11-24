import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateDocument.css'

const CreateDocument = () => {

    const [document, setDocument] = useState({document: "" })
    const {trip_id} = useParams();


    const handleChange = (event) => {
        const {name, value} = event.target;
        setDocument( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const createDocument = async (event) => {
        event.preventDefault()
      
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(document)
        
        }
      
        fetch('/api/documents/' + trip_id, options)
        window.location.href = '/trips'
    }

    return (
        <div>
            <center><h3>Add Document</h3></center>
            <form>
                <label>Document</label> <br />
                <input type="text" id="document" name="document" value={document.document} onChange={handleChange}/><br />
                <br/>

                <label>Trip ID</label><br />
                <input type="number" id="trip_id" name="trip_id" value={trip_id} readOnly/><br />
                <br/>

                <input type="submit" value="Submit" onClick={createDocument} />
            </form>
        </div>
    )
}

export default CreateDocument