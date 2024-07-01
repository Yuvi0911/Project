import express from 'express';
import mongoose from 'mongoose';


const port = 4000;

const connectDb = () => {
    mongoose.connect("mongodb://admin:password@localhost:27071",{
        dbName: "Project"
    }).then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err));
}

const app = express();

app.use(express.json());

app.get("/",(req, res)=>{
    res.send("API working with /api/v1");
});

app.listen(port, ()=> {
    console.log(`Server is working on http://localhost:${port}`)
})