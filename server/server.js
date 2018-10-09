// JavaScript code that runs on the server!

// We want to use express - require the express module
const express = require('express');

// create an instance of express 
// express is a web server
const app = express();

// tell express where to find our public files 
// to give back when it gets HTTP requests for them
app.use( express.static('server/public') );

// tell express to listen for requests on a specific port
const port = 5000;
app.listen(port, function () {
  console.log(`Express is listening on port ${port}`);
})