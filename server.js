import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Connect to MongoDB
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('Mongoose-Cafe');
const items = db.collection("items");

try {
    await client.connect();
    console.log("Connected to MongoDB");
} catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
}

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// GET endpoint for items
app.get("/api/items", async (req, res) => {
    const allItems = await items.find().toArray();
    res.json(allItems);
});

// POST endpoint for items
app.post("/api/items", async (req, res) => {
    const { name, ingredients, imgBase64 } = req.body;
    const result = await items.insertOne({ name, ingredients, imgBase64 });
    res.json({ _id: result.insertedId, name, name, ingredients, imgBase64 });
});

// DELETE endpoint for items
app.delete("/api/items/:id", async (req, res) => {
    await items.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});