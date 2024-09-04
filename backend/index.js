const express= require('express')
const dbConnect = require('./db')
const app = express()
dbConnect()
//  get post update delete crud
const port= 5000
app.use(express.json())
 app.get('/', (req, res)=>{
    res.send('hello nepal')
 })

app.use('/api/auth', require('./routes.js/Auth'))
app.use('/api/product', require('./routes.js/Product'))

 app.listen(port,()=>{
  console.log(`api is listening on port: ${port}`);
})
//crud create read update delete