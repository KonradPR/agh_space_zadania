const express = require('express');
const routes = require('./base');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://test:test1@cluster0-zjll2.gcp.mongodb.net/test?retryWrites=true&w=majority";
const app = express();

app.use(bodyParser.json())
app.use(routes);




app.listen(port, () => {
  console.log('listening on ' + port)
})
