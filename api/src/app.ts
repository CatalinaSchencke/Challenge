import express from 'express';
const bp = require('body-parser')
import {db} from './firebase';
import { doc, collection, setDoc, arrayUnion, updateDoc } from "firebase/firestore"; 

const app = express();
const port = 3000;

app.use(bp.json())

app.post('/addUser', async (req, res) => {
  // Añadir un usuario a la base de datos (con el correo como id)
  const id = req.body.email;
  const userdb = collection(db, "Users");
  const userRef = doc(userdb, id);

  // Añadir un servicio para una creación de usuario correcta
  const userJson ={
    date: req.body.date,
    service: req.body.service,
    value: req.body.value,
    pending: req.body.pending
  }
  
  const response = setDoc(userRef, {
    services: arrayUnion(userJson)
  });
  res.send(response);
});



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


