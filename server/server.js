import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.js";
import documentRoutes from "./routes/documents.js";
import destinationRoutes from "./routes/destinations.js";

// create express app
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send(
        '<h1 style="text-align: center; margin-top: 50px;">TripTrail</h1>'
    );
});

app.use("/api/trips", tripRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/destinations", destinationRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
