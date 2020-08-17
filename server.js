const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.LOCAL_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database connection estabilished successfully");
})

const usersRouter = require('./routes/users.route');
const animalsRouter = require('./routes/animals.route');
const authRouter = require('./routes/auth.route');

app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})