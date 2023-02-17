const express = require('express')
require("./db/conn")
const app = express()
const cors = require("cors")
const router = require('./routes/router')

const port = 5000
app.use(cors())
app.use(express.json())
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})