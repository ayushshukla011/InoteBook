const { connect } = require('mongoose');
const express = require('express')
const connectToMongo=require('./db');
var cors = require('cors')

connectToMongo();



const app=express()
app.use(cors())
const port= 5000

app.use(express.json())

// app.get('/',(req,res)=>
//     res.send('hellow world')
// })
app.use('/auth',require('./routes/auth.js'))
app.use('/notes',require('./routes/notes.js'))

app.listen(port,()=>{
    console.log(`Inotebook backend  listening at http://localhost:${port}`)
})