// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js'
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore-lite.js'
// import { async } from 'https://www.gstatic.com/firebasejs/10.3.1/@firebase-util.js'


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "/firebase/analytics";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFc26xUk9kDpbzOvLv2EY8ixDJySyctFw",
  authDomain: "data-security-ac98c.firebaseapp.com",
  projectId: "data-security-ac98c",
  storageBucket: "data-security-ac98c.appspot.com",
  messagingSenderId: "188706070664",
  appId: "1:188706070664:web:7f0eec5949876aa9b57f3d",
  measurementId: "G-ZHJJ586YBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

async function getUsers(db) {
    const user = collection(db, 'users')
    const userSnapshot = await getDocs(user)
    const userList = userSnapshot.docs.map(doc => doc.data())
    console.log(userList)
    return userList
}


//      //      //      //      //      //
let submit = document.querySelector(".button.submit")
let username = document.querySelector("#username")
let email = document.querySelector("#email")
let phone = document.querySelector("#phone")



const submitForm = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: username.value,
            email: email.value, 
            phone: phone.value
        })
        console.log("Documento escrito com ID: ", docRef.id);

    } catch(e) {console.error("Erro adicionando documento: ", e)}
}

submit.onclick = () => {submitForm()}