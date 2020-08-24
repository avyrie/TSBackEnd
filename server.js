const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');
const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: [`http://localhost:3000`],
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200 
  }));
  
  // Middleware
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  app.use('/api/hikes', routes.hikes);
  app.use('/api/auth', routes.auth);
  
  app.listen(port, () => console.log(`Server is running on port ${port}`));