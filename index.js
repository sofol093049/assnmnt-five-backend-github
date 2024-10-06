const express = require ("express");
const cors=require ("cors");

const app=express();
const port=process.env.PORT||5000;
const book_data=require("./data/book.json");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
 });

app.get("/",(req,res)=>{res.send("Bootcamp The Book Shop Server is Running");})
app.get("/book_data",(req,res)=>{res.send(book_data);})
app.listen(port,()=>{console.log(`Bootcamp The Book Shop Server is Running on port:${port}`)})
