// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "tqcalculator.firebaseapp.com",
  projectId: "tqcalculator",
  storageBucket: "tqcalculator.appspot.com",
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  databaseURL: `${import.meta.env.VITE_FIREBASE_DATABASE_URL}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function addItemToFirebase(item: any) {
    try {
      // Get a reference to the location you want to add the item
      const itemsRef = ref(database, 'cash_flow_diagrams');
  
      // Generate a new unique key for this item
      const newItemRef = push(itemsRef);
  
      // Set the data for this item
      await set(newItemRef, item);
  
      console.log("Item added successfully");
      return newItemRef.key; // Return the unique key of the new item
    } catch (error) {
      console.error("Error adding item to Firebase:", error);
      throw error;
    }
  }
  

