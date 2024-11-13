// backend/src/config/firebase.ts

import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, FieldValue } from "firebase/firestore";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../../../answersai-b7f2b-firebase-adminsdk-81iyu-93f694c629.json";

dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

// Initialize Firebase Client
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const clientApp = initializeClientApp(firebaseConfig);

export const clientAuth = getAuth(clientApp);
export const clientDb = getFirestore(clientApp);

export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
