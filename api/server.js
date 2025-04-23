const express = require('express')
const connectDB = require('./config/db')
const auth = require('./routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express()
const port = 3300
require('dotenv').config();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors(
  {
    credentials: true,
    origin: "http://localhost:5173"
  }
));
app.use(cookieParser());

// define routes
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 