const express = require('express');
const cookieParser = require('cookie-parser')
const  {connectToDB } = require('./src/config/db');
const authRoute = require('./src/routes/auth.route');
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoute);

connectToDB();
app.listen(3000,()=>{
    console.log('server listening on port 3000')
})