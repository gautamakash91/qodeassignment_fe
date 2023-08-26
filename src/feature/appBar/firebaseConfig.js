import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiZ1Y2VcMzGgFVQfj_fWjr5YYNhvD2zHg",
  authDomain: "qode-bdcb2.firebaseapp.com",
  projectId: "qode-bdcb2",
  storageBucket: "qode-bdcb2.appspot.com",
  messagingSenderId: "1045018060264",
  appId: "1:1045018060264:web:7ede6017761abe405bb05d"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;