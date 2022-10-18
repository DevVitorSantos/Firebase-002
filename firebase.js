// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js"
import { 
  getFirestore, 
  collection, 
  addDoc ,
  getDocs, 
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query, where 
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk2p6iQLqyQiX3yhAJ_Ghf-YpQ8_IKly4",
  authDomain: "fir-002-6c9b0.firebaseapp.com",
  projectId: "fir-002-6c9b0",
  storageBucket: "fir-002-6c9b0.appspot.com",
  messagingSenderId: "836271705268",
  appId: "1:836271705268:web:3f66ff634c35995cea9be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//config Firestore
export const db = getFirestore()

export const saveTask = async(title, description) => {
  
  addDoc(collection(db, "tasks"), { title: title, description: description})
  
}

export const getTasks = () => getDocs(collection(db, "tasks"))

export const onGetTasks =  (callback) => onSnapshot(collection(db,'tasks'), callback)
export const deleteTask = (id) => deleteDoc(doc(db,'tasks', id))

export const getTask = (id) => getDoc(doc(db, "tasks", id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)


export {
  onSnapshot,
  collection,
  
  addDoc
}