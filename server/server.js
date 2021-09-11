 import express from 'express';
 import http from 'http';
 import cors from 'cors';
 import dotenv from 'dotenv';
 import path from 'path';
 import connectDB from './config/dbConnection.js';
 import ScrapingRoute from './routes/scrapingRoutes.js';
 
 dotenv.config();
 const environment = process.env.NODE_ENV;

 connectDB();
 
 const app = express();
 const server = http.createServer(app);

 app.use(cors());
 
 app.use(express.urlencoded({ extended: false }));
 app.use(express.json());
 app.use(express.static('../client/build'));

 app.use('/api', ScrapingRoute);

 
 server.listen(process.env.PORT, () => {
   console.log(`server running in ${environment} mode & listening on port ${process.env.PORT}`);
   if (environment !== 'production' && environment !== 'development' && environment !== 'testing') {
     console.error(
       `NODE_ENV is set to ${environment}, but only production and development are valid.`
     );
     process.exit(1);
   }
 });
 