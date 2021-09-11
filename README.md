# Youtube-Scrapping
Trending Youtube Video Scrapping
Mern Stack Project to fetch the trending youtube videos and their channel details using Youtube Data API v3 and store them in MongoDB.

Using Google Apis with Youtube Data Api key, so need your API key to run this project

# Requiement
Node v14.17.3 or higher version


Clone the repo and run the command in both directory client, server
  npm install 

Now go to the server directory, and create new file name .env which have following variables -

    PORT=3001
    MONGO_URL= YOUR_MONGO_SRV
    NODE_ENV= development
    YOUTUBE_API_KEY= YOUR_YOUTUBE_API_KEY

Now run the command in client and server directory -
npm start

it will run the server at port 3001 which is provided in .env file
and client will run on port 3000

after Project run go to link -
    http://localhost:3000 
    




