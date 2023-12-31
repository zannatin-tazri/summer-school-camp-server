const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const cors=require('cors');
const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,PUT,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  })
);

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3moahdm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const instructor=client.db('ourInstructor').collection('instructor');
    app.get('/instructor', async(req,res)=>{
        const cursor2=instructor.find();
        const result=await cursor2.toArray();
        res.send(result);
    })
    
    const classes=client.db('summerCamp').collection('classes');
    app.get('/classes', async(req,res)=>{
        const cursor=classes.find();
        const result=await cursor.toArray();
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })