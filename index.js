const express = require('express');
require('dotenv').config();
const {connection} = require("./db.js");
const {userRouter} = require('./routes/user.route.js');
const cors = require('cors');
const {auth} = require('./middlewares/auth.middleware.js');
const {bookRouter} = require('./routes/book.route.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter)
app.use('/books',auth, bookRouter)

const port = process.env.PORT || 8080;

app.listen(port, async () => {
      try {
            await connection;
            console.log('db is connected');
            console.log(`Server is running on port ${port}`)
      } catch (error) {
            console.log(`Error : ${error}`)
      }
})