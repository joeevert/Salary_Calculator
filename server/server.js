// JS running on the server!

// using express - require the express module
const express = require('express');

// create instance of express - express is a web server
const app = express();

// tell express where to find our public files 
// to send it back when requested by HTTP
app.use( express.static('server/public') );

// tell express to listen for requests on a specific port
const port = process.env.PORT || 5000;;
app.listen(port, function () {
  console.log(`Express listening on port ${port}`);
})