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

// definindo as regex
const regularExpressions = {
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    phone: /^(\+\d{2}-|\+\d{2})?\d{11}$/,
    username: /^[a-z]+(\s[a-z]+){1,10}$/i
}

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

const validateForm = () => {
    const result = [regularExpressions.username.test(username.value), regularExpressions.phone.test(phone.value), regularExpressions.email.test(email.value)]
    if(result[0] && result[1] && result[2]) return true
    else return result
}

submit.onclick = () => {
    console.log(validateForm())

    if (validateForm()) submitForm()
}


// cookies part

const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  //if cookie contains codinglab it will be returned and below of this code will not run
  if (document.cookie.includes("codinglab")) return;
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= codinglab; max-age=" + 60 * 60 * 24 * 30;
      }
    });
  });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);