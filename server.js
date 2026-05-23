const express = require('express');
const  {connectToDB } = require('./src/config/db');
const authRoute = require('./src/routes/auth.route');
const app = express();

app.use(express.json());

app.use('/api/auth',authRoute);

connectToDB();
app.listen(3000,()=>{
    console.log('server listening on port 3000')
})