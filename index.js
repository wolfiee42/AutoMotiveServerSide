const express = require('express');
const app = express();
const cors = require('cors');
const port = process.nextTick.PORT || 5000;

// middlewire
app.use(cors());
app.use(express.json());


// saifalislam2022
// Eud9TrV7fixffY1b


app.get('/', (req, res) => {
    res.send("sup niggas")
})

app.post('/cardetails', (req, res) => {
    const carinfo = req.body;
    console.log(carinfo);
})



app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})
