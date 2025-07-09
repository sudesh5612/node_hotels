const express = require("express");
const db = require("./db");
const app = express();

// Middleware for parsing JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json())


// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
// Add a root route to handle "/"
app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

 //use the routers
 app.use('/person',personRoutes);
 app.use('/menuitem', menuItemRoutes);

app.listen(3000, console.log("server loading...."));
