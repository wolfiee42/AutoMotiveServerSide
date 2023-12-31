const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const productCollection = client.db("productcB").collection("productcars");
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



        app.get('/cardetails/:brand/:id', async (req, res) => {
            const brandname = req.params.brand;
            const id = req.params.id
            const queryi = { _id: new ObjectId(id) };
            const queryb = { brand: brandname };
            const result = await carCollection.findOne(queryi, queryb);
            res.send(result);
            console.log(result);
        })


        app.put('/cardetails/brand/:id', async (req, res) => {
            const id = req.params.id;
            const queryi = { _id: new ObjectId(id) };
            // const brandname = req.params.brand;
            // const queryb = { brand: brandname };
            const car = req.body
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: car.name,
                    imageurl: car.imageurl,
                    price: car.price,
                    description: car.description,
                    brand: car.brand
                },
              };
              const result = await carCollection.updateOne(queryi, updateDoc, options);
              res.send(result);
              console.log(result);
        })

        app.post('/productdetails', async (req, res) => {
            const info = req.body;
            const cursor = await productCollection.insertOne(info);
            res.send(cursor);
            console.log(cursor);
        })
        app.get('/productdetails', async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);
            console.log(result);
        })

        app.delete('/productdetails/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: id };
            const result = await productCollection.deleteOne(cursor);
            res.send(result);
            console.log(result);
        })






        // await client.connect();
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
