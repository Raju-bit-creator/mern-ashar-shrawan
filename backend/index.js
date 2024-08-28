const express= require('express')
const dbConnect = require('./db')
const app = express()
dbConnect()

const port= 5000
app.use(express.json())
 app.get('/', (req, res)=>{
    res.send('hello nepal')
 })
 app.listen(port,()=>{
  console.log(`api is listening on port: ${port}`);
  
 })