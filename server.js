const express = require('express') //we are requering the module of Express
const app = express() //Creating the obejct of Express
const port = 3000 //The const of a port that we assign

const mongoose = require("mongoose")
const url = "mongodb+srv://AlexisAdrianMG:AlexisAdrianMG@cluster0.ajugo4s.mongodb.net/"

async function connect (){
    try{
        await mongoose.connect(url)
        console.log("You're connected")
    }catch(error){
        console.log("Fella , you can't connect" + error)
    }
}
async function insert(){
    try{
        await client.connect();
        console.log("Connected to the server successfully");

        const db = client.db(dbName);
        const col = db.collection("analytics"); //Nombre de la coleccion

        let dataVibes = {
            "specie": "Chihuahua",
            "name": "Yiyo"
        }

        const p = await col.insertOne(dataVibes);
        const myDoc = await col.findOne();
    }catch (err){
        console.log(err.stack);
    }

    finally{
        await client.close(); 
    }
}
connect();