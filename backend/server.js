const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()
const app = express()
app.use(cors());
// app.use(cors({origin: 'http://localhost:3000' ,  credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users',require('./routes/userRoute'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on ${port}`))