import express from 'express';
const bp = require('body-parser')
import {db} from './firebase';


const app = express();
const port = 3000;

app.use(bp.json())



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


