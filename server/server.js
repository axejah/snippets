require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.APP_PORT

const app = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

// routes
const snippets = require('./routes/snippets')
app.use('/snippets', snippets)

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(err)
  console.log(`MongoDB connection initialized`)
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})