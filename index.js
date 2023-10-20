const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const port = process.nextTick.PORT || 5000;

// middlewire
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@wolfiecar.hpdcarw.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    const carCollection = client.db("carDB").collection("cars");
    try {
        
        app.get('/', (req, res) => {
            res.send("sup niggas")
        })



        app.post('/cardetails', async (req, res) => {
            const carinfo = req.body;
            const cursor = await carCollection.insertOne(carinfo);
            res.send(cursor);
            console.log(cursor);
        })



        app.get('/cardetails', async (req, res) => {
            const result = await carCollection.find().toArray();
            res.send(result);
            console.log(result);
        })



        app.get('/cardetails/:brand', async (req, res) => {
            const brandname = req.params.brand
            const query = { brand: brandname };
            const result = await carCollection.find(query).toArray();
            res.send(result);
            console.log(result);
        })



        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})
