import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyC_F2fi2gcxY6kTSD_7FVQGVgNZOWUR0lw',
  authDomain: 'address-book-d2077.firebaseapp.com',
  databaseURL: 'https://address-book-d2077.firebaseio.com',
  projectId: 'address-book-d2077',
  storageBucket: 'address-book-d2077.appspot.com',
  messagingSenderId: '152794032932',
});

export const fireDB = app.database();
export const addressRef = app.database().ref('address');
