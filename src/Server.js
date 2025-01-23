import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from 'dotenv';


const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
//connect on port 5000
app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
//to get wether of certain location
app.get("/",async(req,res)=>{
    const {lat,lng} = req.query;
    const apikey = process.env.OPENWEATHER_API_KEY;
    const request=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}&units=metric`
    try{
        const response=await fetch(request);
        const data = await response.json();
        res.status(200).json(data);
    }catch(error){
        console.error("Error fetching weather data:", error);
        res.status(500).send({ error: "Failed to fetch weather data" });
    }
   
})