import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkRLJ6K5BvEpbLlETg8nkvvbk1Qt9FoX4',
  authDomain: 'gamestracker-c896b.firebaseapp.com',
  databaseURL: 'https://gamestracker-c896b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'gamestracker-c896b',
  storageBucket: 'gamestracker-c896b.firebasestorage.app',
  messagingSenderId: '704112252361',
  appId: '1:704112252361:web:9b54eb0278bdde16928418',
  measurementId: 'G-SLZGPZK9PD',
};

// подключение приложения к проекту Firebase gamestracker-c896b
const app = initializeApp(firebaseConfig);

// Получаем доступ к базе данных Firestore.
// Переменная 'db' — это твой главный инструмент для работы с базой.
const db = getFirestore(app);

// Экспортируем 'db', чтобы использовать ее в других файлах
export { db };
