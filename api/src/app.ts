import express from 'express';
const bp = require('body-parser')
const cors = require('cors');
import { db } from './firebase';
import { doc, collection, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

const app = express();
const port = 3002;

app.use(bp.json());
app.use(cors());

app.post('/addUser', async (req, res) => {

  // add user to db (id = email)
  const id = req.body.email;
  const userdb = collection(db, "Users");
  const userRef = doc(userdb, id);

  // data
  const userJson = {
    date: req.body.date,
    service: req.body.service,
    value: req.body.value,
    pending: req.body.pending
  }

  //add services collection
  const servicedb = collection(db, "Services");
  //add doc services
  const serviceRef = doc(servicedb);
  //put data
  setDoc(serviceRef, userJson);

  //reference to service in user services array
  const response = setDoc(userRef, {
    services: arrayUnion(serviceRef)
  });

  res.send(response);
});

app.post('/addService', async (req, res) => {

  // search user linked to db (id = email)
  const id = req.body.email;
  const userdb = collection(db, "Users");
  const userRef = doc(userdb, id);

  // add data
  const userJson = {
    date: req.body.date,
    service: req.body.service,
    value: req.body.value,
    pending: req.body.pending
  }

  //add services collection
  const servicedb = collection(db, "Services");
  //add doc services
  const serviceRef = doc(servicedb);
  //put data in service
  setDoc(serviceRef, userJson);

  //new reference to service in user services array
  const response = updateDoc(userRef, {
    services: arrayUnion(serviceRef)
  });

  res.send(response);
});



//get all services from user
app.post('/auth/login', async (req, res) => {
  try {
    //get user id
    const id = req.body.email;
    //get user reference
    const docRef = doc(db, "Users", id);
    //get user data
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //create array of services to fill
      const services = [];

      //for each service in user services array
      for (const i in docSnap.data().services) {
        //get service reference
        const refService = docSnap.data().services[i];
        //get service data
        const docService = await getDoc(refService);
        //if service exists, push id of service and datato array
        if (docService.exists()) {
          services.push({
            id: refService.id,
            data: docService.data()
          });
        }
      }

      //send array
      res.send(services);

    } else {
      console.log("No such service!");
    }
  } catch (error) {
    res.send(error);
  }
});

// update pending status on service
app.patch('/updateService', async (req, res) => {
  try {
    //get service id
    const idService = req.body.id;

    //get new pending status
    const pendingUpdate = req.body.pending;

    //get service reference
    const serviceRef = doc(db, "Services", idService);
    //get service data
    const docSnap = await getDoc(serviceRef);

    if (docSnap.exists()) {
      //create service object with new pending status
      const service = {
        date: docSnap.data().date,
        service: docSnap.data().service,
        value: docSnap.data().value,
        pending: pendingUpdate
      }
      //update service
      const response = await updateDoc(serviceRef, service);
      // if response is undefined, send service
      if (response === void (0)) {
        res.send(service);
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


