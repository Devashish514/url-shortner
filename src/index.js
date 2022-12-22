const express = require('express');
const app = express();
const route = require('./routes/user.routes');
require('dotenv').config();


app.use(express.json());
app.use('/api/v1', route);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
console.log(`Express App running on port ${port}`);
});