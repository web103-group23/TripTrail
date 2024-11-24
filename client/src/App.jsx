import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ReadTrips from "./pages/ReadTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import CreateDestination from "./pages/CreateDestination";
import ReadDestinations from "./pages/ReadDestinations";
import TripDetails from "./pages/TripDetails";
import CreateDocument from "./pages/CreateDocument";
import AddToTrip from "./pages/AddToTrip";
import Navigation from "./components/Navigation";

import "./App.css";
import "./index.css";

const App = () => {
    const [trips, setTrips] = useState([]);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch("/api/trips");
            const data = await response.json();
            setTrips(data);
        };

        fetchTrips();
    }, []);

    useEffect(() => {
        const fetchDestinations = async () => {
            const response = await fetch("/api/destinations");
            const data = await response.json();
            setDestinations(data);
        };

        fetchDestinations();
    }, []);

    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/trips",
            element: <ReadTrips data={trips} />,
        },
        {
            path: "/trip/new",
            element: <CreateTrip />,
        },
        {
            path: "/trip/edit/:id",
            element: <EditTrip data={trips} />,
        },
        {
            path: "/destinations",
            element: <ReadDestinations data={destinations} />,
        },
        {
            path: "/trip/get/:id",
            element: <TripDetails data={trips} />,
        },
        {
            path: "/destination/new/:trip_id",
            element: <CreateDestination />,
        },
        {
            path: "/document/create/:trip_id",
            element: <CreateDocument />,
        },
        {
            path: "/destinations/add/:destination_id",
            element: <AddToTrip data={trips} />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <div className="app">
            <Navigation />
            {element}
        </div>
    );
};

export default App;
