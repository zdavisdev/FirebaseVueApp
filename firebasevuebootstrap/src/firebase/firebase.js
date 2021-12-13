// import firebase from 'firebase/app';
// //import { ref, onUnmounted } from 'vue';

// eslint-disable-next-line no-unused-vars
//import firebase from 'firebase/app';
//might need to switch this back later idk
import 'firebase/firestore';
import { initializeApp } from "firebase/app"



const firebaseApp = initializeApp({
  apiKey: "AIzaSyAAqFJygQVPrBw4mdy0sAhLgdKD8fqafeM",
  authDomain: "vuezach-2af90.firebaseapp.com",
  projectId: "vuezach-2af90",
  storageBucket: "vuezach-2af90.appspot.com",
  messagingSenderId: "1051908800392",
  appId: "1:1051908800392:web:97a410fc2c150b7cc4843d",
  measurementId: "G-Z2F070FRLG"
})


const db = firebaseApp.firestore();
const usersCollection = db.collection('canvas');

export const createCanvas = canvas => {
  return usersCollection.add(canvas);
}

export const readData = () => {
  let allData = [];
  db.collection("canvas")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allData.push({
          url: doc.data().newURL.url,
        });

      });
      passData(allData);
      //console.log(allData)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
export function passData(realData) {
  const mySomething = realData;
  console.log(mySomething)
  return mySomething;
}
export const getCanvas = async urlString => {
  console.log(urlString)
  const canvas = await usersCollection.doc(urlString).get()
  return canvas.exists ? canvas.data() : null;
}

export const updateCanvas = (id, canvas) => {
  return usersCollection.doc(id).update(canvas);
}

export const deleteCanvas = id => {
  return usersCollection.doc(id).delete();
}

export default {

  props: {
    url: {
      type: String
    }
  }

}
