require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const blueprints = require('./routes/blueprints');
app.use('/blueprints', blueprints);

const authentication = require('./routes/authentication');
app.use('/authentication', authentication);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})