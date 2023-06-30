const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const dbURI = "mongodb+srv://ahmedabughoshh:admin@cluster0.leatrkm.mongodb.net/?retryWrites=true&w=majority";
const userRouter = require('./routes/userrouter')
const provideRrouter = require('./routes/providerrouter')
const serviceRouter = require('./routes/sevicerouter')
const itemRouter = require('./routes/itemrouter')
const bodyParser = require('body-parser')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}`));

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});



// app.use(adminRouts);
app.use(userRouter);
app.use(provideRrouter);
app.use(serviceRouter);
app.use(itemRouter);



module.exports = {
    server: app,
    start: () => {
        mongoose
            .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`Starting server on port ${PORT}`);
                });
            })
            .catch((error) => console.error('Error in starting server', error))
    },
};

