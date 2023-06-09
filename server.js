const express = require('express') //we are requering the module of Express
const app = express() //Creating the obejct of Express
const port = 3000 //The const of a port that we assign

const mongoose = require("mongoose")
const url = "mongodb+srv://AlexisAdrianMG:AlexisAdrianMG@cluster0.ajugo4s.mongodb.net/"

async function connect (){
    try{
        await mongoose.connect(url)
        console.log("You're connect")
    }catch(error){
        console.log("Fella , you can't connect" + error)
    }
}
connect();