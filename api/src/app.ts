import express from 'express';
const bp = require('body-parser')
import {db} from './firebase';
import { doc, collection, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore"; 

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

app.post ('/addServices', async (req, res) => {
  try{
    //Identificamos al usuario por su correo (id)
    const id = req.body.email;
    const userdb = collection(db, "Users");
    const userRef = doc(userdb, id);

    // Añadir un servicio
    const userJson ={
      date: req.body.date,
      service: req.body.service,
      value: req.body.value,
      pending: req.body.pending
    }
    
    const response = updateDoc(userRef, {
      services: arrayUnion(userJson)
    });
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

//obtener todos los servicios de un usuario
app.get('/getUser', async (req, res) => {
  try{
    //Obtener el id del usuario
    const id = req.body.email;
    //Obtener la referencia del usuario
    const userdb = collection(db, "Users");
    const userRef = doc(userdb, id);
    //Ver si el usuario existe
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      //Si existe, obtener los servicios
      res.send(docSnap.data().services);
    } else {
      //Si no existe, enviar mensaje
      res.send({"message": false});
    }
  } catch (error) {
    res.send(error);
  }
});

//actualizar parámetro pending de servicio
app.patch('/updateService', async (req, res) => {
  try{
    //Obtener el id del usuario
    const id = req.body.email;
    //Obtener la referencia del usuario
    const userdb = collection(db, "Users");
    const userRef = doc(userdb, id);

    //Obtener el número del servicio (posición en el arreglo)
    const numService = req.body.numService;
    //Obtener el valor a actualizar
    const pendingUpdate = req.body.pending;
    //Ver si el servicio existe
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      //Si existe, actualizar el parámetro pending
      const services = docSnap.data().services;
      const response = await updateDoc(userRef, {
        services: {
          ... services,
          [numService]: {
            ... services[numService],
            pending: pendingUpdate
          }
        }
      });
      // Si la response no entrega error
      if (response === void(0)) {
          //Enviar el servicio actualizado
          res.send({
            ... services[numService],
            pending: pendingUpdate
          });
      }
    }

  }
  catch (error) {
    res.send(error);
  }
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


