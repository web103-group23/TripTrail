import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

const directionsApiKey = 'AIzaSyDuI3qpvVWv_azTMyGkqM82z36gJwUzopA';
const placesApiKey = 'AIzaSyDuI3qpvVWv_azTMyGkqM82z36gJwUzopA';

app.get('/api/directions', async (req, res) => {
    const { origin, destination } = req.query;

    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${directionsApiKey}`;

    try {

        const directionsResponse = await fetch(directionsUrl);
        const directionsData = await directionsResponse.json();

        if (directionsData.status === "OK") {
            const route = directionsData.routes[0];

            // Decode polyline points
            const points = decodePolyline(route.overview_polyline.points);

            // Search for places along the route (within a radius of 5000 meters from the polyline points)
            const placesPromises = points.map((point) => {
                const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${point.lat},${point.lng}&radius=5000&key=${placesApiKey}`;
                return fetch(placesUrl).then((response) => response.json());
            });

            // Wait for all the places data
            const placesData = await Promise.all(placesPromises);

            // Extract place names from all the results
            const places = placesData.flatMap(data => data.results.map(place => place.name));

            res.json({
                directions: directionsData,
                places: places,
            });
        } else {
            res.status(500).json({ error: 'Error fetching directions data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Google APIs' });
    }
});

// Helper function to decode polyline
const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        lat += ((result & 0x1) ? ~(result >> 1) : (result >> 1));

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        lng += ((result & 0x1) ? ~(result >> 1) : (result >> 1));

        points.push({ lat: lat / 1E5, lng: lng / 1E5 });
    }

    return points;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
