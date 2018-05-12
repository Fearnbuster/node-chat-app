
// Started: May 11, 2018

const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();

// Static folder:
app.use(express.static(publicPath));



app.listen(port, (err)=>{
  if(err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${port}`);
});
