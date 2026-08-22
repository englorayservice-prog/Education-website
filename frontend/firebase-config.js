/**
 * Firebase Web App Configuration (Compat SDK format)
 * ==================================================
 * Configured for Firebase Project: education-website-17c4b-a2dcb
 */
const firebaseConfig = {
  apiKey: "AIzaSyCNUrZx-nqUtny49Craitv2cTPAVgQRUa4",
  authDomain: "education-website-17c4b-a2dcb.firebaseapp.com",
  projectId: "education-website-17c4b-a2dcb",
  storageBucket: "education-website-17c4b-a2dcb.firebasestorage.app",
  messagingSenderId: "130559698447",
  appId: "1:130559698447:web:29af739ed2d36cefa5657a",
  measurementId: "G-K4STLFDWNL"
};

// Initialize Firebase using global compat object loaded via script tag in index.html
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  window.firebaseAuth = firebase.auth();
} else {
  console.error('[Firebase] firebase-app-compat.js is not loaded.');
}

